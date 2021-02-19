#!/usr/bin/env python3
# flake8: noqa: E402
from variant_tester import test_variants
from dotenv import load_dotenv

load_dotenv()

import os, sys, time, traceback
from layout_tester import test_combination
from style_log_generator import generate_layout_tree, generate_style_log
from html_file_generator import remove_file
from minify_test_file import minify
from bug_report_helper import save_bug_report
from test_subject import TestSubject
from element_tree import ElementTree
from style_map import StyleMap
from webdrivers import chrome
from counter import Counter


def find_bugs(counter):

    chrome_webdriver = chrome.getWebDriver()

    while counter.should_continue():
        body = generate_layout_tree()
        base_style_log = generate_style_log(body, 0.1, is_base=True)
        modified_style_log = generate_style_log(body, 0.1, is_base=False)
        test_subject = TestSubject(ElementTree(body), StyleMap(base_style_log), StyleMap(modified_style_log))

        (no_differences, differences, test_filepath) = test_combination(chrome_webdriver, test_subject, keep_file=True)

        if no_differences:
            counter.incSuccess()
        else:
            # print("Found failing test. Minimizing...")
            (minified_test_subject, minified_differences) = minify(chrome_webdriver, test_subject)

            if minified_differences is None:
                # print("Can't reproduce the problem after minimizing...")
                counter.incNoRepro()
            elif len(minified_test_subject.modified_styles.map) == 0:
                # Hypothesis: caused by "content-visibility"
                counter.incNoMod()
            else:
                counter.incError()
                # print("Testing variants of setup...")
                variants = test_variants(minified_test_subject)
                # print("Saving bug report...")
                save_bug_report(
                    variants,
                    minified_test_subject,
                    minified_differences,
                    test_filepath
                )

        counter.incTests()
        output = counter.getStatusString()
        if output:
            print(output)
            time.sleep(2)


        # Clean up the test file
        remove_file(test_filepath)


if __name__ == "__main__":

    bug_limit = int(os.environ.get("FAILURE_COUNT", 0))
    test_limit = int(os.environ.get("TEST_COUNT", 0))

    counter = Counter(bug_limit, test_limit)

    while counter.should_continue():
        try:
            find_bugs(counter)
        except Exception:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            exc = {
                "etype": exc_type,
                "value": exc_value,
                "traceback": exc_traceback,
            }
            counter.incCrash(exc=exc)
            time.sleep(10)

    if counter.num_crash > 0:
        print("Crash Errors:\n")
        for exc in counter.crash_exceptions:
            traceback.print_exception(exc["etype"], exc["value"], exc["traceback"])
            print("-"*60 + "\n")


