// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

export const styleData = {
// This file specifies all the CSS properties we support and the necessary
// information for our code generation. The various supported arguments
// are described below with example usage

  parameters: {
    // - alias_for: "other-property"
    // Properties specifying alias_for should be virtually identical to the
    // properties they alias. Minor parsing differences are allowed as long as
    // the CSSValues created are of the same format of the aliased property.
    alias_for: {
    },

    // - longhands: ["property", "other-property"]
    // The property is a shorthand for several other properties.
    longhands: {
    },

    // - property_methods: ["method1", "method2"]
    // List of methods that are implemented in the CSSProperty for this
    // property.
    property_methods: {
      default: [],
      valid_type: "list",
      valid_values: [
        "ParseSingleValue",
        "ParseShorthand",
        "CSSValueFromComputedStyleInternal",
        "ColorIncludingFallback",
        "InitialValue"
      ],
    },

    // Suppresses code generation for the specified style builder functions.
    // This allows us to provide hand-written style builder functions in cases
    // where it's needed.
    style_builder_custom_functions: {
      default: [],
      valid_type: "list",
      valid_values: [
        "initial",
        "inherit",
        "value",
      ],
    },

    // Affects how the style building functions are generated.
    //
    // Several property groups (e.g. color properties) deviate from the default
    // style builder application, yet there are enough of these properties that
    // we want to generate code for them rather than having manually written
    // style builder functions.
    style_builder_template: {
      valid_values: [
        "animation",
        "auto",
        "background_layer",
        "border_image",
        "color",
        "counter",
        "empty",
        "grid",
        // The legacy template means that regular code generation should not be
        // be performed, and that the property is hard-coded in
        // style_builder_functions.cc.tmpl.
        "legacy",
        "mask_box",
        "mask_layer",
        "transition",
        "visited_color",
      ],
    },

    // Additional arguments to 'style_builder_template' may be provided here.
    style_builder_template_args: {
      default: {},
      valid_type: "dict"
    },

    // - is_descriptor
    // Whether it is a CSS descriptor. Descriptors define the characteristics of
    // an at-rule. E.g. @font-face is an at-rule, and src is a valid descriptor
    // for @font-face. Descriptors and CSS properties with the same name are
    // handled together in this file.
    // TODO(crbug.com/752745): Don't use CSSPropertyID for descriptors.
    // - is_property
    // Whether it is a CSS property. If this is false then is_descriptor must be
    // true.
    is_descriptor: {
      default: false,
      valid_type: "bool",
    },
    is_property: {
      default: true,
      valid_type: "bool",
    },

    // - independent
    // This property affects only one field on ComputedStyle, and can be set
    // directly during inheritance instead of forcing a recalc.
    // StyleResolver and StyleAdjuster are not invoked when these properties
    // are changed on a parent. Recalcs only happen if at least one
    // non-independent inherited property is changed in the parent.
    independent: {
      default: false,
      valid_type: "bool",
    },

    // - semi_independent_variable
    // This property affects to the {Inherited, NonInherited}Variable data fields so that we
    // can assume that the custom properties might not depend on any other property. We can
    // handle these properties so that they are excluded from the shared Inherited/NohInherited
    // logic, like the Equal and inheritance functions.
    semi_independent_variable: {
      default: false,
      valid_type: "bool",
    },

    // - affected_by_all
    // The affected_by_all flag indicates whether a change to the CSS property
    // "all" affects this property.
    // c.f. https://drafts.csswg.org/css-cascade/#all-shorthand
    // Descriptors (is_property: false) are never affected by changes to the
    // all property.
    affected_by_all: {
      default: true,
      valid_type: "bool",
    },

    // - interpolable
    // The interpolable flag indicates whether a property can be animated
    // smoothly. If this flag is set, the property should also be added to the
    // switch statements in CSSPropertyEquality and CSSInterpolationTypesMap.
    interpolable: {
      default: false,
      valid_type: "bool",
    },

    // - inherited
    // The property will inherit by default if no value is specified, typically
    // mentioned in specifications as "Inherited: yes"
    inherited: {
      default: false,
      valid_type: "bool",
    },

    // - compositable
    // The property can be animated by the compositor
    compositable: {
      default: false,
      valid_type: "bool",
    },

    // - computed_value_comparable
    //
    // If true, a CSSProperty::ComputedValuesEqual function is generated.
    computed_value_comparable: {
      default: false,
      valid_type: "bool",
    },

    // - computed_value_compare_fields
    //
    // If present, the ComputedStyle fields listed will be used in the
    // generated ComputedvaluesEqual function. This is useful if the value
    // of a property is stored in multiple fields. For example, for
    // vertical-align:
    //
    // computed_value_compare_fields: ['VerticalAlign', 'GetVerticalAlignLength']
    //
    // Has no effect unless computed_value_comparable is true.
    computed_value_compare_fields: {
      default: [],
    },

    // - runtime_flag
    // The name of the flag on RuntimeEnabledFeatures
    // (e.g. "CSSOverscrollBehavior") that conditionally enables the
    // property.
    // This doesn't currently work with alias_for.
    runtime_flag: {
      valid_type: "str",
    },

    // - field_group
    // Name of the group that this field belongs to. Fields in the same group
    // are stored together as a nested class inside ComputedStyle and
    // dynamically allocated on use.
    // Leave this out if the field is stored directly on ComputedStyle.
    // If you want to auto group this property use: field_group: "*[->subgroup]"
    // If you use the auto grouping function check if your property is in
    // css_properties_ranking.json5
    // -  If yes, only provide: field_group: "*"
    // -  If no, you can specify a subgroup following the asterisk:
    //    field_group: "*[->subgroup]"
    field_group: {
      valid_type: "str",
    },

    // - field_size
    // Number of bits needed to store this field.
    field_size: {
      valid_type: "int",
    },

    // - field_template
    // Affects how the interface to this field is generated.
    // TODO(sashab, meade): Remove this once TypedOM types are specified for
    // every property, since this value can be inferred from that.
    field_template: {
      valid_values: [
        // Field is stored as an enum and has a initial/getter/setter/resetter.
        // If include_paths is empty, we would also generate the corresponding
        // enum definition in ComputedStyleConstants.h.
        "keyword",
        // Field can take on any subset of values from a list of keywords.
        "multi_keyword",
        // Field stores a primitive value like int/bool. The type is specified
        // by type_name. The interface has a initial/getter/setter/resetter.
        "primitive",
        // Field is stored as a bool, whose default value is false
        // and can only be set to true. Has a initial/getter/setter.
        "monotonic_flag",
        // Field has type specified at type_name and has a getter/setter.
        // Also has a setter taking an rvalue reference. Cannot be packed.
        "external",
        // Field is stored as a wrapper_pointer_name to a class.
        "pointer",
        // Preset "length" for external and Length class
        // This preset represents alias templates that will be replace by
        // entries in CSSFieldAlias.json5.
        "<[a-z]+>"
      ],
    },

    // - include_paths: ["path/to/file1.h", "path/to/file2.h"]
    // List of files containing the definitions of types in 'type_name'. Each of
    // these files will appear as a #include in ComputedStyleBase.h. For
    // example, if the type_name is 'Vector<String>', include_paths should be
    // ["third_party/blink/renderer/platform/wtf/vector.h",
    //  "third_party/blink/renderer/platform/wtf/text/wtf_string.h"]
    include_paths: {
      default: [],
    },

    // Name of the pointer type that wraps this field (e.g. scoped_refptr).
    wrapper_pointer_name: {
      valid_type: "str",
      valid_values: ["scoped_refptr", "Persistent", "std::unique_ptr"],
    },

    // - keywords: ["keyword1", "keyword2"]
    // This specifies all valid keyword values for the property.
    // TODO(sashab): Once all properties are represented here, delete
    // CSSValueKeywords.in and use this list instead.
    keywords: {
      default: [],
    },

    // - default_value: "keyword-value"
    // This specifies the default value for this field.
    // - for keyword fields, this is the initial keyword
    // - for other fields, this is a string containg the C++ expression
    //   that is used to initialise the field.
    default_value: {
    },

    // Flags which go into CSSOMTypes:
    // - typedom_types: ["Keyword", "Type", "OtherType"]
    // The property can take types specified in typedom_types for CSS Typed OM.
    // - separator
    // The property supports a list of values, and when there is more than one,
    // it is separated with this character.
    typedom_types: {
      default: [],
      valid_type: "list",
      valid_values: [
        "Angle",
        "Flex",
        "Frequency",
        "Keyword",
        "Length",
        "Number",
        "Percentage",
        "Position",
        "Resolution",
        "Time",
        "Transform",
        "Unparsed",
        "Image"
      ],
    },
    separator: {
      valid_values: [",", " ", "/"],
    },

    // The remaining arguments are used for the StyleBuilder and allow us to
    // succinctly describe how to apply properties. When default handlers are
    // not sufficient, we should prefer to use converter, and failing that
    // define custom property handlers in CSSProperty subclasses. We should only
    // use style_builder_functions.tmpl to define handlers when there are
    // multiple properties requiring the same handling, but converter doesn't
    // suffice.

    // - font
    // The default property handlers call into the FontBuilder instead of
    // setting values directly onto the ComputedStyle
    // - svg
    // The default property handlers access the SVGComputedStyle
    font: {
      default: false,
      valid_type: "bool",
    },
    svg: {
      default: false,
      valid_type: "bool",
    },

    // - name_for_methods: "BlendMode"
    // Tweaks how we choose defaults for getter, setter, initial and type_name.
    // For example, setting this to BlendMode will make us use a setter of
    // setBlendMode
    // - initial
    // The static function to invoke on ComputedStyleInitialValues,
    // SVGComputedStyle, or FontBuilder to retrieve the initial value.
    // Defaults to e.g. InitialBorderBottomLeft.
    // - getter
    // The ComputedStyle getter, defaults to e.g. BorderBottomLeft
    // - setter
    // The ComputedStyle setter, defaults to e.g. GetBorderBottomLeft
    // - type_name
    // The computed type for the property. Only required for the default value
    // application, defaults to e.g. EDisplay
    name_for_methods: {
    },
    initial: {
    },
    getter: {
    },
    setter: {
    },
    type_name: {
    },

    // - custom_function: Any function specified in the list is not
    // automatically generated in ComputedStyle. Use this when a generated
    // function is not correct.
    computed_style_custom_functions: {
      default: [],
      valid_type: "list",
      valid_values: ["initial", "getter", "setter", "reset", "mutable"],
    },

    // - converter: "ConvertRadius"
    // The StyleBuilder will call the specified function on
    // StyleBuilderConverter to convert a CSSValue to an appropriate platform
    // value
    converter: {
    },

    // Options used for properties that depend on writing-mode and/or
    // text-direction (e.g. css-logical).
    direction_aware_options: {
      // The name of the mapping function used to convert from a logical
      // property to a physical property. Corresponds to a function in
      // CSSDirectionAwareResolver. E.g. a value of "baz" corresponds to
      // CSSDirectionAwareResolver::ResolveBaz(...).
      resolver: {
        valid_type: "str",
        valid_values: ["inline-start", "inline-end", "block-start", "block-end",
                       "inline", "block"],
      },
      // The name of the physical property group to pass to the resolver.
      // The group represents the physical part of the "logical property group"
      // described by css-logical [1].
      //
      // In terms of code generation, each value corresponds to a function in
      // CSSDirectionAwareResolver. E.g. a value of "foo-bar" would correspond
      // to CSSDirectionAwareResolver::FooBarGroup().
      //
      // [1] https://drafts.csswg.org/css-logical/#logical-property-group
      physical_group: {
        valid_type: "str",
        valid_values: ["border", "border-color", "border-style", "border-width",
                       "inset", "margin", "max-size",
                       "min-size", "overflow", "padding", "scroll-margin",
                       "scroll-padding", "size", "visited-border-color"],
      }
    },

    // - surrogate_for: "other-property"
    //
    // A surrogate is a property which acts like another property. Unlike an
    // alias (which is resolved as parse-time), a surrogate exists alongside
    // the original in the parsed rule, and in the cascade.
    //
    // However, surrogates modify the same fields on ComputedStyle. Examples of
    // surrogates are:
    //
    //  * -webkit-writing-mode (surrogate of writing-mode)
    //  * inline-size (surrogate for width, or height)
    //  * All css-logical propeties in general
    //
    // Note that for properties that use direction_aware_options,
    // 'surrogate_for' should not be set, as the mapping is determined at
    // run-time (depending og e.g. 'direction').
    surrogate_for: {
      valid_type: "str",
    },

    // - priority: "High"
    // The priority level for computing the property. Properties with the same
    // priority level are grouped and computed in alphabetical order.
    priority: {
      default: "Low",
      valid_values: ["High", "Low"],
    },

    // - layout_dependent
    // The resolved value used for getComputedStyle() depends on layout for this
    // property, which means we may need to update layout to return the correct
    // value from getComputedStyle(). Setting this to true will override
    // IsLayoutDependentProperty() to return true and require a custom
    // IsLayoutDependent() which typically checks for LayoutObject existence and
    // type.
    layout_dependent: {
      default: false,
      valid_type: "bool",
    },

    // - visited_property_for: "other-property"
    // CSS properties that are allowed in :visited selectors each have an
    // internal "companion" property with the visited value. For privacy reasons
    // CSSOM APIs must return computed values as if links aren't visited, but
    // for rendering purposes we need the value with the :visited rules applied.
    //
    // This means that the regular property (e.g. background-color) represents
    // the value as seen by CSSOM, and the -internal-visited counterpart (e.g.
    // -internal-visited-background-color) represents the same property as seen
    // by painting.
    visited_property_for: {
      valid_type: "str",
    },

    // - affected_by_forced_colors
    // The property value will be overridden with the default value defined in
    // the forced colors UA style sheet when forced colors mode is enabled and
    // forced-color-adjust is set to auto.
    affected_by_forced_colors: {
      default: false,
      valid_type: "bool",
    },

    // - valid_for_first_letter: true
    //
    // https://drafts.csswg.org/css-pseudo-4/#first-letter-styling
    valid_for_first_letter: {
      default: false,
      valid_type: "bool",
    },

    // - valid_for_cue: true
    //
    // https://w3c.github.io/webvtt/#the-cue-pseudo-element
    valid_for_cue: {
      default: false,
      valid_type: "bool",
    },

    // - valid_for_marker: true
    //
    // https://drafts.csswg.org/css-pseudo-4/#marker-pseudo
    valid_for_marker: {
      default: false,
      valid_type: "bool",
    },

    // - is_border
    // The property, when used by the author, will disable any native
    // appearance on UI elements.
    is_border: {
      default: false,
      valid_type: "bool",
    },

    // - is_background
    // The property, when used by the author, will disable any native
    // appearance on UI elements.
    is_background: {
      default: false,
      valid_type: "bool",
    },
  },

  // Members in the data objects should appear in the same order as in the
  // parameters object above
  data: [
    // Properties with StyleBuilder handling

    // Animation Priority properties
    {
      name: "animation-delay",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "Delay",
      },
      typedom_types: ["Time"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-direction",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      keywords: ["normal", "reverse", "alternate", "alternate-reverse"],
      typedom_types: ["Keyword"],
      separator: ",",
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "Direction",
      },
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-duration",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      separator: ",",
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "Duration",
      },
      typedom_types: ["Time"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-fill-mode",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "FillMode",
      },
      keywords: ["none", "forwards", "backwards", "both"],
      typedom_types: ["Keyword"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-iteration-count",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      keywords: ["infinite"],
      separator: ",",
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "IterationCount",
      },
      keywords: ["infinite"],
      typedom_types: ["Keyword", "Number"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-name",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "Name",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-play-state",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "PlayState",
      },
      keywords: ["running", "paused"],
      typedom_types: ["Keyword"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "animation-timeline",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "Timeline",
      },
      keywords: ["none", "auto"],
      typedom_types: ["Keyword"],
      separator: ",",
      valid_for_marker: true,
      runtime_flag: "CSSScrollTimeline",
    },
    {
      name: "animation-timing-function",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "animation",
      style_builder_template_args: {
        attribute: "TimingFunction",
      },
      keywords: [
        "linear",
        "ease",
        "ease-in",
        "ease-out",
        "ease-in-out",
        "jump-both",
        "jump-end",
        "jump-none",
        "jump-start",
        "step-start",
        "step-end"
      ],
      typedom_types: ["Keyword"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "transition-delay",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "transition",
      style_builder_template_args: {
        attribute: "Delay",
      },
      typedom_types: ["Time"],
      separator: ",",
      valid_for_marker: true,
    },
    {
      name: "transition-duration",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      typedom_types: ["Keyword", "Time"],
      separator: ",",
      style_builder_template: "transition",
      style_builder_template_args: {
        attribute: "Duration",
      },
      valid_for_marker: true,
    },
    {
      name: "transition-property",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "transition",
      style_builder_template_args: {
        attribute: "Property",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"],
      valid_for_marker: true,
    },
    {
      name: "transition-timing-function",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_template: "transition",
      style_builder_template_args: {
        attribute: "TimingFunction",
      },
      keywords: [
        "linear",
        "ease",
        "ease-in",
        "ease-out",
        "ease-in-out",
        "jump-both",
        "jump-end",
        "jump-none",
        "jump-start",
        "step-start",
        "step-end"],
      typedom_types: ["Keyword"],
      separator: ",",
      valid_for_marker: true,
    },

    // High Priority and all other font properties.
    // Other properties can depend upon high priority properties
    // (e.g. font-size / ems)
    {
      name: "color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      inherited: true,
      field_group: "inherited",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor(Color::kBlack)",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "direction",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      affected_by_all: false,
      inherited: true,
      field_template: "keyword",
      include_paths: ["third_party/blink/renderer/platform/text/text_direction.h"],
      keywords: ["ltr", "rtl"],
      typedom_types: ["Keyword"],
      default_value: "ltr",
      type_name: "TextDirection",
      style_builder_custom_functions: ["value"],
      priority: "High",
      valid_for_marker: true,
      computed_value_comparable: true,
    },
    {
      name: "font-family",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      inherited: true,
      font: true,
      name_for_methods: "FamilyDescription",
      type_name: "FontDescription::FamilyDescription",
      converter: "ConvertFontFamily",
      priority: "High",
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "font-kerning",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      name_for_methods: "Kerning",
      type_name: "FontDescription::Kerning",
      priority: "High",
      keywords: ["auto", "normal", "none"],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-optical-sizing",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      name_for_methods: "FontOpticalSizing",
      type_name: "OpticalSizing",
      priority: "High",
      keywords: ["auto", "none"],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-size",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      font: true,
      name_for_methods: "Size",
      getter: "GetSize",
      converter: "ConvertFontSize",
      priority: "High",
      keywords: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "larger", "smaller", "-webkit-xxx-large"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "font-size-adjust",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      runtime_flag: "CSSFontSizeAdjust",
      font: true,
      name_for_methods: "SizeAdjust",
      converter: "ConvertFontSizeAdjust",
      priority: "High",
      keywords: ["none"],
      typedom_types: ["Keyword", "Number"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-stretch",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      inherited: true,
      font: true,
      name_for_methods: "Stretch",
      converter: "ConvertFontStretch",
      priority: "High",
      keywords: [
        "normal", "ultra-condensed", "extra-condensed", "condensed",
        "semi-condensed", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"
      ],
      typedom_types: ["Keyword", "Percentage"],
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "font-style",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      inherited: true,
      font: true,
      name_for_methods: "Style",
      converter: "ConvertFontStyle",
      priority: "High",
      keywords: ["normal", "italic", "oblique"],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "font-variant-ligatures",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      name_for_methods: "VariantLigatures",
      type_name: "VariantLigatures",
      converter: "ConvertFontVariantLigatures",
      priority: "High",
      keywords: [
         "normal", "none", "common-ligatures", "no-common-ligatures",
         "discretionary-ligatures", "no-discretionary-ligatures",
         "historical-ligatures", "no-historical-ligatures", "contextual",
         "no-contextual"
      ],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-variant-caps",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      name_for_methods: "VariantCaps",
      converter: "ConvertFontVariantCaps",
      priority: "High",
      keywords: [
        "normal", "small-caps", "all-small-caps", "petite-caps",
        "all-petite-caps", "unicase", "titling-caps"
      ],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-variant-east-asian",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      name_for_methods: "VariantEastAsian",
      converter: "ConvertFontVariantEastAsian",
      priority: "High",
      keywords: [
         "normal", "jis78", "jis83", "jis90", "jis04", "simplified",
         "traditional", "full-width", "proportional-width", "ruby"
      ],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-variant-numeric",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      name_for_methods: "VariantNumeric",
      converter: "ConvertFontVariantNumeric",
      priority: "High",
      keywords: [
        "normal", "lining-nums", "oldstyle-nums", "proportional-nums",
        "tabular-nums", "diagonal-fractions", "stacked-fractions", "ordinal",
        "slashed-zero"
      ],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-weight",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      inherited: true,
      font: true,
      name_for_methods: "Weight",
      converter: "ConvertFontWeight",
      priority: "High",
      keywords: ["normal", "bold", "bolder", "lighter"],
      typedom_types: ["Keyword", "Number"],
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "font-feature-settings",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      inherited: true,
      font: true,
      name_for_methods: "FeatureSettings",
      converter: "ConvertFontFeatureSettings",
      priority: "High",
      keywords: ["normal"],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "font-variation-settings",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      font: true,
      name_for_methods: "VariationSettings",
      converter: "ConvertFontVariationSettings",
      priority: "High",
      keywords: ["normal"],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "-webkit-font-smoothing",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      type_name: "FontSmoothingMode",
      priority: "High",
      valid_for_first_letter: true,
    },
    {
      name: "forced-color-adjust",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      runtime_flag: "ForcedColors",
      field_template: "keyword",
      priority: "High",
      keywords: ["auto", "none"],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "-webkit-locale",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      style_builder_custom_functions: ["value"],
      priority: "High",
    },
    {
      name: "text-orientation",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["sideways", "mixed", "upright"],
      typedom_types: ["Keyword"],
      default_value: "mixed",
      getter: "GetTextOrientation",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
    },
    {
      name: "-webkit-text-orientation",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      type_name: "TextOrientation",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
      surrogate_for: "text-orientation",
    },
    {
      name: "writing-mode",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_template: "keyword",
      include_paths: ["third_party/blink/renderer/platform/text/writing_mode.h"],
      keywords: ["horizontal-tb", "vertical-rl", "vertical-lr"],
      typedom_types: ["Keyword"],
      default_value: "horizontal-tb",
      type_name: "WritingMode",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
      computed_value_comparable: true,
    },
    {
      name: "-webkit-writing-mode",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      type_name: "WritingMode",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
      surrogate_for: "writing-mode",
      computed_value_comparable: true,
    },
    {
      name: "text-rendering",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      font: true,
      type_name: "TextRenderingMode",
      keywords: ["auto", "optimizespeed", "optimizelegibility", "geometricprecision"],
      typedom_types: ["Keyword"],
      priority: "High",
    },
    {
      name: "zoom",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      field_group: "visual",
      field_template: "primitive",
      default_value: "1.0",
      type_name: "float",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
    },
    {
      name: "align-content",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_content_alignment_data.h"],
      default_value: "StyleContentAlignmentData(ContentPosition::kNormal, ContentDistributionType::kDefault, OverflowAlignment::kDefault)",
      type_name: "StyleContentAlignmentData",
      converter: "ConvertContentAlignmentData",
      computed_value_comparable: true,
    },
    {
      name: "align-items",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_self_alignment_data.h"],
      default_value: "StyleSelfAlignmentData(ItemPosition::kNormal, OverflowAlignment::kDefault)",
      type_name: "StyleSelfAlignmentData",
      converter: "ConvertSelfOrDefaultAlignmentData",
      computed_value_comparable: true,
    },
    {
      name: "alignment-baseline",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      svg: true,
      keywords: ["baseline", "alphabetic", "ideographic", "middle", "central", "mathematical"],
      typedom_types: ["Keyword"]
    },
    {
      name: "align-self",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_self_alignment_data.h"],
      default_value: "StyleSelfAlignmentData(ItemPosition::kAuto, OverflowAlignment::kDefault)",
      type_name: "StyleSelfAlignmentData",
      converter: "ConvertSelfOrDefaultAlignmentData",
      computed_value_comparable: true,
    },
    {
      name: "aspect-ratio",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: false,
      field_group: "box",
      field_template: "external",
      keywords: ["auto"],
      default_value: "base::nullopt",
      type_name: "base::Optional<IntSize>",
      converter: "ConvertAspectRatio",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_size.h"],
      runtime_flag: "CSSAspectRatioProperty"
    },
    {
      name: "backdrop-filter",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_filter_data.h"],
      wrapper_pointer_name: "Persistent",
      default_value: "MakeGarbageCollected<StyleFilterData>()",
      type_name: "StyleFilterData",
      computed_style_custom_functions: ["initial", "getter","setter"],
      converter: "ConvertFilterOperations",
      keywords: ["none"],
      typedom_types: ["Keyword"],
    },
    {
      name: "backface-visibility",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["visible", "hidden"],
      typedom_types: ["Keyword"],
      default_value: "visible",
    },
    {
      name: "background-attachment",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      keywords: ["scroll", "fixed", "local"],
      typedom_types: ["Keyword"],
      separator: " ",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "Attachment",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-blend-mode",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      keywords: [
        "normal", "multiply", "screen", "overlay", "darken", "lighten",
        "color-dodge", "color-burn", "hard-light", "soft-light", "difference",
        "exclusion", "hue", "saturation", "color", "luminosity"
      ],
      typedom_types: ["Keyword"],
      separator: " ",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "BlendMode",
        fill_type_getter: "GetBlendMode",
      },
      valid_for_first_letter: true,
      is_background: true,
    },
    {
      name: "background-clip",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      keywords: ["border-box", "padding-box", "content-box"],
      typedom_types: ["Keyword"],
      separator: " ",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "Clip",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "background",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor(Color::kTransparent)",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      style_builder_template_args: {
        initial_color: "ComputedStyleInitialValues::InitialBackgroundColor",
      },
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-image",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      keywords: ["auto", "none"],
      typedom_types: ["Keyword", "Image"],
      separator: " ",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "Image",
        fill_type_getter: "GetImage",
      },
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-origin",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      keywords: ["border-box", "padding-box", "content-box"],
      typedom_types: ["Keyword"],
      separator: " ",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "Origin",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-position-x",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "PositionX",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-position-y",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "PositionY",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "background-repeat-x",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "RepeatX",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "background-repeat-y",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "RepeatY",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "background-size",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      keywords: ["auto", "cover", "contain"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      separator: " ",
      style_builder_template: "background_layer",
      style_builder_template_args: {
        fill_type: "Size",
      },
      valid_for_first_letter: true,
      valid_for_cue: true,
      is_background: true,
    },
    {
      name: "baseline-shift",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      style_builder_custom_functions: ["inherit", "value"],
      keywords: ["sub", "super"],
      typedom_types: ["Keyword", "Percentage", "Length"]
    },
    {
      name: "border-bottom-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-bottom-left-radius",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_size.h"],
      default_value: "LengthSize(Length::Fixed(0), Length::Fixed(0))",
      type_name: "LengthSize",
      converter: "ConvertRadius",
      typedom_types: ["Length", "Percentage"],
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-bottom-right-radius",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_size.h"],
      default_value: "LengthSize(Length::Fixed(0), Length::Fixed(0))",
      type_name: "LengthSize",
      converter: "ConvertRadius",
      typedom_types: ["Length", "Percentage"],
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-bottom-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "surround",
      field_template: "keyword",
      keywords: [
        "none", "hidden", "inset", "groove", "outset", "ridge", "dotted",
        "dashed", "solid", "double"
      ],
      typedom_types: ["Keyword"],
      default_value: "none",
      type_name: "EBorderStyle",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-bottom-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      keywords: ["thin", "medium", "thick"],
      default_value: "LayoutUnit(3)",
      typedom_types: ["Keyword", "Length"],
      type_name: "LayoutUnit",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertBorderWidth",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-collapse",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["separate", "collapse"],
      typedom_types: ["Keyword"],
      default_value: "separate",
    },
    {
      name: "border-image-outset",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      interpolable: true,
      typedom_types: ["Length", "Number"],
      style_builder_template: "border_image",
      style_builder_template_args: {
        modifier_type: "Outset",
      },
      valid_for_first_letter: true,
      is_border: true,
    },
    {
      name: "border-image-repeat",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      keywords: ["stretch", "repeat", "round", "space"],
      typedom_types: ["Keyword"],
      style_builder_template: "border_image",
      style_builder_template_args: {
        modifier_type: "Repeat",
      },
      valid_for_first_letter: true,
      is_border: true,
    },
    {
      name: "border-image-slice",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      interpolable: true,
      typedom_types: ["Number", "Percentage"],
      style_builder_template: "border_image",
      style_builder_template_args: {
        modifier_type: "Slice",
      },
      valid_for_first_letter: true,
      is_border: true,
    },
    {
      name: "border-image-source",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      interpolable: true,
      keywords: ["none"],
      typedom_types: ["Keyword", "Image"],
      style_builder_custom_functions: ["value"],
      valid_for_first_letter: true,
      is_border: true,
    },
    {
      name: "border-image-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      interpolable: true,
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage", "Number"],
      style_builder_template: "border_image",
      style_builder_template_args: {
        modifier_type: "Width",
      },
      valid_for_first_letter: true,
      is_border: true,
    },
    {
      name: "border-left-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-left-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "surround",
      field_template: "keyword",
      keywords: [
        "none", "hidden", "inset", "groove", "outset", "ridge", "dotted",
        "dashed", "solid", "double"
      ],
      typedom_types: ["Keyword"],
      default_value: "none",
      type_name: "EBorderStyle",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-left-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      keywords: ["thin", "medium", "thick"],
      default_value: "LayoutUnit(3)",
      typedom_types: ["Keyword", "Length"],
      type_name: "LayoutUnit",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertBorderWidth",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-right-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-right-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "surround",
      field_template: "keyword",
      keywords: [
        "none", "hidden", "inset", "groove", "outset", "ridge", "dotted",
        "dashed", "solid", "double"
      ],
      typedom_types: ["Keyword"],
      default_value: "none",
      type_name: "EBorderStyle",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-right-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      keywords: ["thin", "medium", "thick"],
      default_value: "LayoutUnit(3)",
      typedom_types: ["Keyword", "Length"],
      type_name: "LayoutUnit",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertBorderWidth",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-top-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-top-left-radius",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_size.h"],
      default_value: "LengthSize(Length::Fixed(0), Length::Fixed(0))",
      type_name: "LengthSize",
      converter: "ConvertRadius",
      typedom_types: ["Length", "Percentage"],
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-top-right-radius",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_size.h"],
      default_value: "LengthSize(Length::Fixed(0), Length::Fixed(0))",
      type_name: "LengthSize",
      converter: "ConvertRadius",
      typedom_types: ["Length", "Percentage"],
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-top-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "surround",
      field_template: "keyword",
      keywords: [
        "none", "hidden", "inset", "groove", "outset", "ridge", "dotted",
        "dashed", "solid", "double"
      ],
      typedom_types: ["Keyword"],
      default_value: "none",
      type_name: "EBorderStyle",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "border-top-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "surround",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      keywords: ["thin", "medium", "thick"],
      default_value: "LayoutUnit(3)",
      typedom_types: ["Keyword", "Length"],
      type_name: "LayoutUnit",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertBorderWidth",
      valid_for_first_letter: true,
      is_border: true,
      computed_value_comparable: true,
    },
    {
      name: "bottom",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      keywords: ["auto"],
      default_value: "Length()",
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
      computed_value_comparable: true,
    },
    {
      name: "box-shadow",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/core/style/shadow_list.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "ShadowList",
      converter: "ConvertShadowList",
      keywords: ["none"],
      typedom_types: ["Keyword"],
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
    },
    {
      name: "box-sizing",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "box",
      field_template: "keyword",
      keywords: ["content-box", "border-box"],
      typedom_types: ["Keyword"],
      default_value: "content-box",
    },
    {
      name: "break-after",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      // Storage for this property also covers these legacy properties:
      // page-break-after, -webkit-column-break-after
      field_template: "keyword",
      keywords: [
        "auto", "avoid", "avoid-column", "avoid-page", "column", "left", "page",
        "recto", "right", "verso"
      ],
      typedom_types: ["Keyword"],
      default_value: "auto",
      type_name: "EBreakBetween",
    },
    {
      name: "break-before",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      // Storage for this property also covers these legacy properties:
      // page-break-before, -webkit-column-break-before
      field_template: "keyword",
      keywords: [
        "auto", "avoid", "avoid-column", "avoid-page", "column", "left", "page",
        "recto", "right", "verso"
      ],
      typedom_types: ["Keyword"],
      default_value: "auto",
      type_name: "EBreakBetween",
    },
    {
      name: "break-inside",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      // Storage for this property also covers these legacy properties:
      // page-break-inside, -webkit-column-break-inside
      field_template: "keyword",
      keywords: ["auto", "avoid", "avoid-column", "avoid-page"],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "buffered-rendering",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      svg: true,
    },
    {
      name: "caption-side",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["top", "bottom"],
      typedom_types: ["Keyword"],
      default_value: "top",
    },
    {
      name: "caret-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_auto_color.h"],
      default_value: "StyleAutoColor::AutoColor()",
      type_name: "StyleAutoColor",
      computed_style_custom_functions: ["getter"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      keywords: ["auto", "currentcolor"],
      typedom_types: ["Keyword"],
    },
    {
      name: "clear",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      computed_style_custom_functions: ["getter"],
      keywords: ["none", "left", "right", "both", "inline-start", "inline-end"],
      typedom_types: ["Keyword"],
      default_value: "none",
    },
    {
      name: "clip",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "visual",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_box.h"],
      default_value: "LengthBox()",
      type_name: "LengthBox",
      computed_style_custom_functions: ["setter"],
      style_builder_template: "auto",
      converter: "ConvertClip",
      keywords: ["auto"],
      typedom_types: ["Keyword"],
    },
    {
      name: "clip-path",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/core/style/clip_path_operation.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "ClipPathOperation",
      converter: "ConvertClipPath",
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "clip-rule",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      type_name: "WindRule",
      keywords: ["nonzero", "evenodd"],
      typedom_types: ["Keyword"]
    },
    {
      name: "color-interpolation",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      keywords: ["auto", "srgb", "linearrgb"],
      typedom_types: ["Keyword"],
    },
    {
      name: "color-interpolation-filters",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      type_name: "EColorInterpolation",
    },
    {
      name: "color-rendering",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      keywords: ["auto", "optimizespeed", "optimizequality"],
      typedom_types: ["Keyword"],
    },
    {
      name: "color-scheme",
      field_group: "*",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "InitialValue"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      inherited: true,
      runtime_flag: "CSSColorScheme",
      include_paths: ["third_party/blink/public/platform/web_color_scheme.h"],
      type_name: "Vector<AtomicString>",
      default_value: "Vector<AtomicString, 0>()",
      field_template: "external",
      priority: "High",
    },
    {
      name: "column-fill",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["balance", "auto"],
      default_value: "balance",
      getter: "GetColumnFill",
      typedom_types: ["Keyword"]
    },
    {
      name: "contain",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_size: 4,
      field_template: "primitive",
      default_value: "kContainsNone",
      name_for_methods: "Contain",
      type_name: "unsigned",
      converter: "ConvertFlags<Containment>",
      keywords: ["none", "strict", "content", "size", "layout", "style", "paint"],
      typedom_types: ["Keyword"],
    },
    {
      name: "contain-intrinsic-size",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "box",
      field_template: "external",
      keywords: ["auto"],
      default_value: "LengthSize(Length::Auto(), Length::Auto())",
      type_name: "LengthSize",
      converter: "ConvertIntrinsicSize",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_size.h"],
    },
    {
      name: "content",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/content_data.h"],
      wrapper_pointer_name: "Persistent",
      default_value: "nullptr",
      separator: ",",
      type_name: "ContentData",
      computed_style_custom_functions: ["getter", "setter"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      valid_for_marker: true,
    },
    {
      name: "counter-increment",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "counter",
      style_builder_template_args: {
        action: "Increment",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"],
    },
    {
      name: "counter-reset",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "counter",
      style_builder_template_args: {
        action: "Reset",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"],
    },
    {
      name: "counter-set",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "counter",
      style_builder_template_args: {
        action: "Set",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"],
    },
    {
      name: "cursor",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_template: "keyword",
      keywords: [
        "auto", "default", "none", "context-menu", "help", "pointer",
        "progress", "wait", "cell", "crosshair", "text", "vertical-text",
        "alias", "copy", "move", "no-drop", "not-allowed", "e-resize",
        "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize",
        "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize",
        "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in",
        "zoom-out", "grab", "grabbing"
      ],
      default_value: "auto",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      typedom_types: ["Keyword"]
    },
    {
      name: "cx",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      typedom_types: ["Length", "Percentage"],
      converter: "ConvertLength",
    },
    {
      name: "cy",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      typedom_types: ["Length", "Percentage"],
      converter: "ConvertLength",
    },
    {
      name: "d",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      converter: "ConvertPathOrNone",
      keywords: ["none"],
      typedom_types: ["Keyword"],
    },
    {
      name: "display",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      keywords: [
        "inline", "block", "list-item", "inline-block", "table", "inline-table",
        "table-row-group", "table-header-group", "table-footer-group",
        "table-row", "table-column-group", "table-column", "table-cell",
        "table-caption", "-webkit-box", "-webkit-inline-box", "flex",
        "inline-flex", "grid", "inline-grid", "contents", "flow-root", "none"
      ],
      typedom_types: ["Keyword"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
    },
    {
      name: "dominant-baseline",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      keywords: ["auto", "alphabetic", "ideographic", "middle", "central", "mathematical", "hanging"],
      typedom_types: ["Keyword"]
    },
    {
      name: "empty-cells",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["show", "hide"],
      typedom_types: ["Keyword"],
      default_value: "show",
    },
    {
      name: "fill",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      initial: "InitialFillPaint",
      setter: "SetFillPaint",
      getter: "FillPaint",
      converter: "ConvertSVGPaint",
      affected_by_forced_colors: true,
    },
    {
      name: "fill-opacity",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      converter: "ConvertAlpha",
      typedom_types: ["Number"],
    },
    {
      name: "fill-rule",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      type_name: "WindRule",
      keywords: ["nonzero", "evenodd"],
      typedom_types: ["Keyword"]
    },
    {
      name: "filter",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_filter_data.h"],
      wrapper_pointer_name: "Persistent",
      default_value: "MakeGarbageCollected<StyleFilterData>()",
      type_name: "StyleFilterData",
      computed_style_custom_functions: ["initial", "getter", "setter"],
      converter: "ConvertFilterOperations",
      keywords: ["none"],
      typedom_types: ["Keyword"],
    },
    {
      name: "flex-basis",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "<length>",
      default_value: "Length::Auto()",
      converter: "ConvertLengthOrAuto",
      typedom_types: ["Keyword", "Length", "Percentage"],
      keywords: ["auto"],
      computed_value_comparable: true,
    },
    {
      name: "flex-direction",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      typedom_types: ["Keyword"],
      keywords: ["row", "row-reverse", "column", "column-reverse"],
      default_value: "row",
      computed_value_comparable: true,
    },
    {
      name: "flex-grow",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
      typedom_types: ["Number"],
      computed_value_comparable: true,
    },
    {
      name: "flex-shrink",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "1.0f",
      type_name: "float",
      typedom_types: ["Number"],
      computed_value_comparable: true,
    },
    {
      name: "flex-wrap",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      typedom_types: ["Keyword"],
      keywords: ["nowrap", "wrap", "wrap-reverse"],
      default_value: "nowrap",
      computed_value_comparable: true,
    },
    {
      name: "float",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      computed_style_custom_functions: ["getter"],
      keywords: ["none", "left", "right", "inline-start", "inline-end"],
      typedom_types: ["Keyword"],
      default_value: "none",
      name_for_methods: "Floating",
      type_name: "EFloat",
      valid_for_first_letter: true,
    },
    {
      name: "flood-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      svg: true,
      converter: "ConvertStyleColor",
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
    },
    {
      name: "flood-opacity",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      converter: "ConvertAlpha",
      typedom_types: ["Number"]
    },
    {
      name: "grid-auto-columns",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_track_list.h"],
      default_value: "GridTrackList(GridTrackSize(Length::Auto()))",
      type_name: "GridTrackList",
      converter: "ConvertGridTrackSizeList",
      keywords: ["auto", "min-content", "max-content"],
      typedom_types: ["Keyword", "Length", "Percentage", "Flex"],
      separator: " "
    },
    {
      name: "grid-auto-flow",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_size: 4, // FIXME: Make this use "kGridAutoFlowBits".
      field_template: "primitive",
      default_value: "kAutoFlowRow",
      type_name: "GridAutoFlow",
      computed_style_custom_functions: ["getter"],
      converter: "ConvertGridAutoFlow",
      keywords: ["row", "column"],
      typedom_types: ["Keyword"]
    },
    {
      name: "grid-auto-rows",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_track_list.h"],
      default_value: "GridTrackList(GridTrackSize(Length::Auto()))",
      type_name: "GridTrackList",
      converter: "ConvertGridTrackSizeList",
      keywords: ["auto", "min-content", "max-content"],
      typedom_types: ["Keyword", "Length", "Percentage", "Flex"],
      separator: " "
    },
    {
      name: "grid-column-end",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_position.h"],
      default_value: "GridPosition()",
      type_name: "GridPosition",
      keywords: ["auto"],
      typedom_types: ["Keyword"],
      converter: "ConvertGridPosition",
    },
    {
      name: "grid-column-start",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_position.h"],
      default_value: "GridPosition()",
      type_name: "GridPosition",
      keywords: ["auto"],
      typedom_types: ["Keyword"],
      converter: "ConvertGridPosition",
    },
    {
      name: "grid-row-end",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_position.h"],
      default_value: "GridPosition()",
      type_name: "GridPosition",
      keywords: ["auto"],
      typedom_types: ["Keyword"],
      converter: "ConvertGridPosition",
    },
    {
      name: "grid-row-start",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_position.h"],
      default_value: "GridPosition()",
      type_name: "GridPosition",
      keywords: ["auto"],
      typedom_types: ["Keyword"],
      converter: "ConvertGridPosition",
    },
    {
      name: "grid-template-areas",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "grid-template-columns",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      layout_dependent: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_track_list.h"],
      default_value: "GridTrackList()",
      type_name: "GridTrackList",
      style_builder_template: "grid",
      style_builder_template_args: {
        type: "Column",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "grid-template-rows",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      layout_dependent: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/grid_track_list.h"],
      default_value: "GridTrackList()",
      type_name: "GridTrackList",
      style_builder_template: "grid",
      style_builder_template_args: {
        type: "Row",
      },
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "height",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      layout_dependent: true,
      field_group: "box",
      field_template: "<length>",
      keywords: ["auto", "fit-content", "min-content", "max-content"],
      default_value: "Length()",
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthSizing",
      computed_value_comparable: true,
    },
    {
      name: "hyphens",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["none", "manual", "auto"],
      default_value: "manual",
      type_name: "Hyphens",
      typedom_types: ["Keyword"],
      valid_for_marker: true,
    },
    {
      name: "image-rendering",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: [
        "auto", "optimizespeed", "optimizequality",
        "-webkit-optimize-contrast", "pixelated"
      ],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "image-orientation",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      runtime_flag: "ImageOrientation",
      field_group: "*",
      field_template: "primitive",
      default_value: "true",
      name_for_methods: "RespectImageOrientation",
      type_name: "bool",
      converter: "ConvertImageOrientation",
    },
    {
      name: "isolation",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["auto", "isolate"],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "justify-content",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_content_alignment_data.h"],
      default_value: "StyleContentAlignmentData(ContentPosition::kNormal, ContentDistributionType::kDefault, OverflowAlignment::kDefault)",
      type_name: "StyleContentAlignmentData",
      converter: "ConvertContentAlignmentData",
      computed_value_comparable: true,
    },
    {
      name: "justify-items",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_self_alignment_data.h"],
      default_value: "StyleSelfAlignmentData(ItemPosition::kLegacy, OverflowAlignment::kDefault)",
      type_name: "StyleSelfAlignmentData",
      converter: "ConvertSelfOrDefaultAlignmentData",
      computed_value_comparable: true,
    },
    {
      name: "justify-self",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_self_alignment_data.h"],
      default_value: "StyleSelfAlignmentData(ItemPosition::kAuto, OverflowAlignment::kDefault)",
      type_name: "StyleSelfAlignmentData",
      converter: "ConvertSelfOrDefaultAlignmentData",
      computed_value_comparable: true,
    },
    {
      name: "left",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      keywords: ["auto"],
      default_value: "Length()",
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
      computed_value_comparable: true,
    },
    {
      name: "letter-spacing",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      converter: "ConvertSpacing",
      keywords: ["normal"],
      typedom_types: ["Keyword", "Length"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "lighting-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      svg: true,
      converter: "ConvertStyleColor",
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
    },
    {
      name: "line-height",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "inherited",
      field_template: "<length>",
      default_value: "Length::Percent(-100.0)",
      getter: "SpecifiedLineHeight",
      computed_style_custom_functions: ["getter"],
      converter: "ConvertLineHeight",
      keywords: ["normal"],
      typedom_types: ["Keyword", "Length", "Number", "Percentage"],
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "line-height-step",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      runtime_flag: "CSSSnapSize",
      field_group: "*",
      field_template: "primitive",
      default_value: "0",
      type_name: "uint8_t",
      converter: "ConvertComputedLength<uint8_t>",
      typedom_types: ["Length"],
    },
    {
      name: "list-style-image",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_image.h"],
      wrapper_pointer_name: "Persistent",
      default_value: "nullptr",
      typedom_types: ["Keyword", "Image"],
      type_name: "StyleImage",
      computed_style_custom_functions: ["getter", "setter"],
      style_builder_custom_functions: ["value"],
      keywords: ["none"]
    },
    {
      name: "list-style-position",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["outside", "inside"],
      typedom_types: ["Keyword"],
      default_value: "outside",
    },
    {
      name: "list-style-type",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      keywords: [
        "disc", "circle", "square", "decimal", "decimal-leading-zero",
        "arabic-indic", "bengali", "cambodian", "khmer", "devanagari",
        "gujarati", "gurmukhi", "kannada", "lao", "malayalam", "mongolian",
        "myanmar", "oriya", "persian", "urdu", "telugu", "tibetan", "thai",
        "lower-roman", "upper-roman", "lower-greek", "lower-alpha",
        "lower-latin", "upper-alpha", "upper-latin", "cjk-earthly-branch",
        "cjk-heavenly-stem", "ethiopic-halehame", "ethiopic-halehame-am",
        "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "hangul",
        "hangul-consonant", "korean-hangul-formal", "korean-hanja-formal",
        "korean-hanja-informal", "hebrew", "armenian", "lower-armenian",
        "upper-armenian", "georgian", "cjk-ideographic", "simp-chinese-formal",
        "simp-chinese-informal", "trad-chinese-formal", "trad-chinese-informal",
        "hiragana", "katakana", "hiragana-iroha", "katakana-iroha", "none"
      ],
      style_builder_custom_functions: ["initial", "inherit", "value"],
    },
    {
      name: "margin-bottom",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertQuirkyLength",
      computed_style_custom_functions: ["setter"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "margin-left",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertQuirkyLength",
      computed_style_custom_functions: ["setter"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "margin-right",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertQuirkyLength",
      computed_style_custom_functions: ["setter"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "margin-top",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertQuirkyLength",
      computed_style_custom_functions: ["setter"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "marker-end",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      name_for_methods: "MarkerEndResource",
      converter: "ConvertElementReference",
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "marker-mid",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      name_for_methods: "MarkerMidResource",
      converter: "ConvertElementReference",
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "marker-start",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      name_for_methods: "MarkerStartResource",
      converter: "ConvertElementReference",
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "mask",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      svg: true,
      name_for_methods: "MaskerResource",
      converter: "ConvertElementReference",
    },
    {
      name: "mask-type",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      svg: true,
      keywords: ["luminance", "alpha"],
      typedom_types: ["Keyword"]
    },
    // TODO(rbuis): should be moved to high priority later.
    {
      name: "math-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      inherited: true,
      keywords: ["inline", "display"],
      typedom_types: ["Keyword"],
      default_value: "inline",
      runtime_flag: "CSSMathStyle"
    },
    {
      name: "math-superscript-shift-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      inherited: true,
      keywords: ["inline", "display"],
      typedom_types: ["Keyword"],
      default_value: "display",
      runtime_flag: "CSSMathSuperscriptShiftStyle"
    },
    {
      name: "max-height",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      field_group: "box",
      field_template: "<length>",
      default_value: "Length::None()",
      converter: "ConvertLengthMaxSizing",
      keywords: ["none"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      computed_value_comparable: true,
    },
    {
      name: "max-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      field_group: "box",
      field_template: "<length>",
      default_value: "Length::None()",
      converter: "ConvertLengthMaxSizing",
      keywords: ["none"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      computed_value_comparable: true,
    },
    {
      name: "min-height",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      field_group: "box",
      field_template: "<length>",
      default_value: "Length()",
      converter: "ConvertLengthSizing",
      typedom_types: ["Length", "Percentage"],
      computed_value_comparable: true,
    },
    {
      name: "min-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      field_group: "box",
      field_template: "<length>",
      default_value: "Length()",
      converter: "ConvertLengthSizing",
      typedom_types: ["Length", "Percentage"],
      computed_value_comparable: true,
    },
    {
      name: "mix-blend-mode",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      include_paths: ["third_party/blink/renderer/platform/graphics/graphics_types.h"],
      keywords: [
        "normal", "multiply", "screen", "overlay", "darken", "lighten",
        "color-dodge", "color-burn", "hard-light", "soft-light", "difference",
        "exclusion", "hue", "saturation", "color", "luminosity"
      ],
      typedom_types: ["Keyword"],
      default_value: "normal",
      name_for_methods: "BlendMode",
      type_name: "BlendMode",
    },
    {
      name: "object-fit",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["fill", "contain", "cover", "none", "scale-down"],
      typedom_types: ["Keyword"],
      default_value: "fill",
      getter: "GetObjectFit",
    },
    {
      name: "object-position",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_point.h"],
      default_value: "LengthPoint(Length::Percent(50.0), Length::Percent(50.0))",
      type_name: "LengthPoint",
      converter: "ConvertPosition",
      typedom_types: ["Keyword", "Position"],
    },
    {
      name: "offset-anchor",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      runtime_flag: "CSSOffsetPositionAnchor",
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_point.h"],
      default_value: "LengthPoint(Length::Auto(), Length::Auto())",
      type_name: "LengthPoint",
      converter: "ConvertPositionOrAuto",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Position"]
    },
    {
      name: "offset-distance",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "<length>",
      default_value: "Length::Fixed(0)",
      converter: "ConvertLength",
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "offset-path",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/core/style/basic_shapes.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "BasicShape",
      converter: "ConvertOffsetPath",
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "offset-position",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      runtime_flag: "CSSOffsetPositionAnchor",
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_point.h"],
      default_value: "LengthPoint(Length::Auto(), Length::Auto())",
      type_name: "LengthPoint",
      converter: "ConvertPositionOrAuto",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Position"]
    },
    {
      name: "offset-rotate",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/style_offset_rotation.h"],
      default_value: "StyleOffsetRotation(0, OffsetRotationType::kAuto)",
      type_name: "StyleOffsetRotation",
      converter: "ConvertOffsetRotate",
      keywords: ["auto", "reverse"],
      typedom_types: ["Keyword", "Angle"]
    },
    {
      name: "opacity",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "1.0",
      type_name: "float",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Number"],
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "order",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "0",
      type_name: "int",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Number"]
    },
    {
      // This property is used for testing with origin trial intergration only.
      // It should never be web-exposed.
      name: "origin-trial-test-property",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      default_value: "normal",
      keywords: ["normal", "none"],
      typedom_types: ["Keyword"],
      runtime_flag: "OriginTrialsSampleAPI"
    },
    {
      name: "orphans",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "primitive",
      computed_style_custom_functions: ["setter"],
      default_value: "2",
      type_name: "short",
      typedom_types: ["Number"]
    },
    {
      name: "outline-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_cue: true,
    },
    {
      name: "outline-offset",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      default_value: "LayoutUnit(0)",
      type_name: "LayoutUnit",
      converter: "ConvertLayoutUnit",
      typedom_types: ["Length"],
      valid_for_cue: true,
    },
    {
      name: "outline-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: [
        "none", "hidden", "inset", "groove", "outset", "ridge", "dotted",
        "dashed", "solid", "double"
      ],
      typedom_types: ["Keyword"],
      default_value: "none",
      type_name: "EBorderStyle",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      valid_for_cue: true,
    },
    {
      name: "outline-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      default_value: "LayoutUnit(3)",
      type_name: "LayoutUnit",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertBorderWidth",
      keywords: ["thin", "medium", "thick"],
      typedom_types: ["Keyword", "Length"],
      valid_for_cue: true,
    },
    {
      name: "overflow-anchor",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: false,
      field_template: "keyword",
      keywords: [
        "visible", "none", "auto"
      ],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "overflow-wrap",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["normal", "break-word", "anywhere"],
      default_value: "normal",
      typedom_types: ["Keyword"],
      valid_for_marker: true,
    },
    {
      name: "overflow-inline",
      direction_aware_options: {
        resolver: "inline",
        physical_group: "overflow",
      },
      runtime_flag: "CSSLogicalOverflow",
    },
    {
      name: "overflow-block",
      direction_aware_options: {
        resolver: "block",
        physical_group: "overflow",
      },
      runtime_flag: "CSSLogicalOverflow",
    },
    {
      name: "overflow-x",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: [
        "visible", "hidden", "scroll", "auto", "overlay", "clip"
      ],
      typedom_types: ["Keyword"],
      default_value: "visible",
      type_name: "EOverflow",
    },
    {
      name: "overflow-y",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: [
        "visible", "hidden", "scroll", "auto", "overlay", "clip"
      ],
      typedom_types: ["Keyword"],
      default_value: "visible",
      type_name: "EOverflow",
    },
    {
      name: "overscroll-behavior-inline",
      direction_aware_options: {
        resolver: "inline",
        physical_group: "overscroll-behavior",
      },
    },
    {
      name: "overscroll-behavior-block",
      direction_aware_options: {
        resolver: "block",
        physical_group: "overscroll-behavior",
      },
    },
    {
      name: "overscroll-behavior-x",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: ["auto", "contain", "none"],
      default_value: "auto",
      type_name: "EOverscrollBehavior",
      typedom_types: ["Keyword"]
    },
    {
      name: "overscroll-behavior-y",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: ["auto", "contain", "none"],
      default_value: "auto",
      type_name: "EOverscrollBehavior",
      typedom_types: ["Keyword"]
    },
    {
      name: "padding-bottom",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertLength",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "padding-left",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertLength",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "padding-right",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertLength",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "padding-top",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      converter: "ConvertLength",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "page",
      field_group: "*",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      converter: "ConvertPage",
      type_name: "AtomicString",
      default_value: "AtomicString()",
      field_template: "external",
      keywords: ["auto"],
      typedom_types: ["Keyword"],
      runtime_flag: "NamedPages"
    },
    {
      name: "page-orientation",
      is_descriptor: true,
      field_template: "primitive",
      field_group: "*",
      type_name: "PageOrientation",
      field_size: 2,
      default_value: "PageOrientation::kUpright",
      include_paths: ["third_party/blink/public/common/css/page_orientation.h"],
      runtime_flag: "NamedPages"
    },
    {
      name: "paint-order",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      converter: "ConvertPaintOrder",
      keywords: ["normal", "fill", "stroke", "markers"],
      typedom_types: ["Keyword"]
    },
    {
      name: "perspective",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0",
      type_name: "float",
      converter: "ConvertPerspective",
      keywords: ["none"],
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "perspective-origin",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length_point.h"],
      default_value: "LengthPoint(Length::Percent(50.0), Length::Percent(50.0))",
      type_name: "LengthPoint",
      converter: "ConvertPosition",
      typedom_types: ["Position"]
    },
    {
      name: "pointer-events",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: [
        "none", "auto", "stroke", "fill", "painted", "visible", "visiblestroke",
        "visiblefill", "visiblepainted", "bounding-box", "all"
      ],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "position",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: [
        "static", "relative", "absolute", "fixed", "sticky"
      ],
      typedom_types: ["Keyword"],
      default_value: "static",
      getter: "GetPosition",
      style_builder_custom_functions: ["inherit"],
    },
    {
      name: "quotes",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/core/style/quotes_data.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "QuotesData",
      converter: "ConvertQuotes",
      keywords: ["auto", "none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "content-visibility",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: ["visible", "auto", "hidden", "hidden-matchable"],
      default_value: "visible",
      typedom_types: ["Keyword"],
      runtime_flag: "CSSContentVisibility"
    },
    {
      name: "resize",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      computed_style_custom_functions: ["getter"],
      style_builder_custom_functions: ["value"],
      keywords: ["none", "both", "horizontal", "vertical", "block", "inline"],
      typedom_types: ["Keyword"],
      default_value: "none",
    },
    {
      name: "right",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      keywords: ["auto"],
      default_value: "Length()",
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
      computed_value_comparable: true,
    },
    {
      name: "r",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      typedom_types: ["Length", "Percentage"],
      converter: "ConvertLength",
    },
    {
      name: "rx",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
    },
    {
      name: "ry",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
    },
    {
      name: "scrollbar-gutter",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_size: 4,
      field_template: "primitive",
      default_value: "kScrollbarGutterAuto",
      name_for_methods: "ScrollbarGutter",
      type_name: "unsigned",
      converter: "ConvertScrollbarGutter",
      keywords: [
        "auto", "stable", "always"
      ],
      typedom_types: ["Keyword"],
      runtime_flag: "ScrollbarGutter",
    },
    {
      name: "scroll-behavior",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_size: 2, // FIXME: Convert this to a keyword field
      field_template: "primitive",
      default_value: "mojom::blink::ScrollBehavior::kAuto",
      type_name: "mojom::blink::ScrollBehavior",
      keywords: ["auto", "smooth"],
      typedom_types: ["Keyword"],
    },
    {
      name: "scroll-margin-block-end",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "scroll-margin",
      },
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-customization",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      converter: "ConvertFlags<blink::scroll_customization::ScrollDirection>",
      type_name: "scroll_customization::ScrollDirection",
      field_group: "*",
      field_size: 4,
      field_template: "primitive",
      default_value: "scroll_customization::kScrollDirectionNone",
      include_paths: ["third_party/blink/renderer/core/scroll/scroll_customization.h"],
      runtime_flag: "ScrollCustomization",
    },
    {
      name: "scroll-margin-block-start",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "scroll-margin",
      },
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-margin-bottom",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
      converter: "ConvertComputedLength<float>",
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-margin-inline-end",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "scroll-margin",
      },
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-margin-inline-start",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "scroll-margin",
      },
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-margin-left",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
      converter: "ConvertComputedLength<float>",
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-margin-right",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
      converter: "ConvertComputedLength<float>",
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-margin-top",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
      converter: "ConvertComputedLength<float>",
      typedom_types: ["Keyword", "Length"]
    },
    {
      name: "scroll-padding-block-end",
      property_methods: ["ParseSingleValue"],
      include_paths: ["third_party/blink/renderer/platform/geometry/length.h"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      type_name: "Length",
      converter: "ConvertLengthOrAuto",
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "scroll-padding",
      },
    },
    {
      name: "scroll-padding-block-start",
      property_methods: ["ParseSingleValue"],
      include_paths: ["third_party/blink/renderer/platform/geometry/length.h"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      type_name: "Length",
      converter: "ConvertLengthOrAuto",
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "scroll-padding",
      },
    },
    {
      name: "scroll-padding-bottom",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "<length>",
      default_value: "Length()",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
    },
    {
      name: "scroll-padding-inline-end",
      property_methods: ["ParseSingleValue"],
      include_paths: ["third_party/blink/renderer/platform/geometry/length.h"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      type_name: "Length",
      converter: "ConvertLengthOrAuto",
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "scroll-padding",
      },
    },
    {
      name: "scroll-padding-inline-start",
      property_methods: ["ParseSingleValue"],
      include_paths: ["third_party/blink/renderer/platform/geometry/length.h"],
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      type_name: "Length",
      converter: "ConvertLengthOrAuto",
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "scroll-padding",
      },
    },
    {
      name: "scroll-padding-left",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "<length>",
      default_value: "Length()",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
    },
    {
      name: "scroll-padding-right",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "<length>",
      default_value: "Length()",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
    },
    {
      name: "scroll-padding-top",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "<length>",
      default_value: "Length()",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
    },
    {
      name: "scroll-snap-align",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["cc/input/scroll_snap_data.h"],
      default_value: "cc::ScrollSnapAlign()",
      getter: "GetScrollSnapAlign",
      type_name: "cc::ScrollSnapAlign",
      converter: "ConvertSnapAlign",
      keywords: ["none", "start", "end", "center"],
      typedom_types: ["Keyword"]
    },
    {
      name: "scroll-snap-stop",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: ["normal", "always"],
      default_value: "normal",
      typedom_types: ["Keyword"]
    },
    {
      name: "scroll-snap-type",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      include_paths: ["cc/input/scroll_snap_data.h"],
      default_value: "cc::ScrollSnapType()",
      getter: "GetScrollSnapType",
      type_name: "cc::ScrollSnapType",
      converter: "ConvertSnapType",
      keywords: ["none", "x", "y", "block", "inline", "both", "mandatory", "proximity"],
      typedom_types: ["Keyword"]
    },
    {
      name: "shape-image-threshold",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0",
      type_name: "float",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Number"]
    },
    {
      name: "shape-margin",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "<length>",
      default_value: "Length::Fixed(0)",
      converter: "ConvertLength",
      keywords: ["none"],
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "shape-outside",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/shape_value.h"],
      wrapper_pointer_name: "Persistent",
      default_value: "nullptr",
      typedom_types: ["Keyword", "Image"],
      type_name: "ShapeValue",
      computed_style_custom_functions: ["getter"],
      converter: "ConvertShapeValue",
      keywords: ["none"]
    },
    {
      name: "shape-rendering",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      keywords: ["auto", "optimizespeed", "crispedges", "geometricprecision"],
      typedom_types: ["Keyword"],
    },
    {
      name: "size",
      property_methods: ["ParseSingleValue"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
    },
    {
      name: "speak",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: [
        "none", "normal", "spell-out", "digits", "literal-punctuation",
        "no-punctuation"
      ],
      default_value: "normal",
    },
    {
      name: "stop-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      svg: true,
      converter: "ConvertStyleColor",
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
    },
    {
      name: "stop-opacity",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      converter: "ConvertAlpha",
      typedom_types: ["Number"]
    },
    {
      name: "stroke",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      initial: "InitialStrokePaint",
      setter: "SetStrokePaint",
      getter: "StrokePaint",
      converter: "ConvertSVGPaint",
      affected_by_forced_colors: true,
    },
    {
      name: "stroke-dasharray",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      name_for_methods: "StrokeDashArray",
      converter: "ConvertStrokeDasharray",
      keywords: ["none"],
      typedom_types: ["Keyword"]
    },
    {
      name: "stroke-dashoffset",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      name_for_methods: "StrokeDashOffset",
      converter: "ConvertLength",
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "stroke-linecap",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      name_for_methods: "CapStyle",
      type_name: "LineCap",
      keywords: ["butt", "round", "square"],
      typedom_types: ["Keyword"]
    },
    {
      name: "stroke-linejoin",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      name_for_methods: "JoinStyle",
      type_name: "LineJoin",
      keywords: ["miter", "bevel", "round"],
      typedom_types: ["Keyword"]
    },
    {
      name: "stroke-miterlimit",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      name_for_methods: "StrokeMiterLimit",
      type_name: "float",
      typedom_types: ["Number"]
    },
    {
      name: "stroke-opacity",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      converter: "ConvertAlpha",
      typedom_types: ["Number"]
    },
    {
      name: "stroke-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      svg: true,
      converter: "ConvertUnzoomedLength",
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "table-layout",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: [
        "auto", "fixed"
      ],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "tab-size",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/text/tab_size.h"],
      default_value: "TabSize(8)",
      getter: "GetTabSize",
      type_name: "TabSize",
      converter: "ConvertLengthOrTabSpaces",
      computed_style_custom_functions: ["setter"],
      typedom_types: ["Number", "Length"],
      valid_for_marker: true,
    },
    {
      name: "text-align",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: false,
      inherited: true,
      field_template: "keyword",
      keywords: [
        "left", "right", "center", "justify", "-webkit-left", "-webkit-right",
        "-webkit-center", "start", "end"
      ],
      typedom_types: ["Keyword"],
      default_value: "start",
      getter: "GetTextAlign",
      style_builder_custom_functions: ["value"],
    },
    {
      name: "text-align-last",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["auto", "start", "end", "left", "right", "center", "justify"],
      default_value: "auto",
      typedom_types: ["Keyword"]
    },
    {
      name: "text-anchor",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      svg: true,
      keywords: ["start", "middle", "end"],
      typedom_types: ["Keyword"]
    },
    {
      name: "text-combine-upright",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["none", "all"],
      typedom_types: ["Keyword"],
      default_value: "none",
      name_for_methods: "TextCombine",
      valid_for_marker: true,
    },
    {
      name: "text-decoration-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
      computed_value_comparable: true,
    },
    {
      name: "text-decoration-line",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "visual",
      field_template: "multi_keyword",
      keywords: ["none", "underline", "overline", "line-through", "blink"],
      typedom_types: ["Keyword"],
      default_value: "none",
      name_for_methods: "TextDecoration",
      type_name: "TextDecoration",
      converter: "ConvertFlags<TextDecoration>",
      valid_for_first_letter: true,
      valid_for_cue: true,
      computed_value_comparable: true,
    },
    {
      name: "text-decoration-skip-ink",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["none", "auto"],
      typedom_types: ["Keyword"],
      default_value: "auto",
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
      computed_value_comparable: true,
    },
    {
      name: "text-decoration-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["solid", "double", "dotted", "dashed", "wavy"],
      typedom_types: ["Keyword"],
      default_value: "solid",
      valid_for_first_letter: true,
      valid_for_cue: true,
      computed_value_comparable: true,
    },
    {
      name: "text-decoration-thickness",
      runtime_flag: "UnderlineOffsetThickness",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      include_paths: ["third_party/blink/renderer/core/style/text_decoration_thickness.h"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      type_name: "TextDecorationThickness",
      default_value: "TextDecorationThickness(Length::Auto())",
      converter: "ConvertTextDecorationThickness",
      keywords: ["auto", "from-font"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
    },
    {
      name: "text-indent",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "<length>",
      default_value: "Length::Fixed()",
      style_builder_custom_functions: ["initial", "inherit", "value"],
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "text-justify",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      runtime_flag: "CSS3Text",
      field_group: "*",
      field_template: "keyword",
      include_paths: ["third_party/blink/renderer/platform/text/text_justify.h"],
      keywords: ["auto", "none", "inter-word", "distribute"],
      default_value: "auto",
      getter: "GetTextJustify",
      type_name: "TextJustify",
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
    },
    {
      name: "text-overflow",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["clip", "ellipsis"],
      typedom_types: ["Keyword"],
      default_value: "clip",
    },
    {
      name: "text-shadow",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/core/style/shadow_list.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "ShadowList",
      converter: "ConvertShadowList",
      keywords: ["none"],
      typedom_types: ["Keyword"],
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "text-size-adjust",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/text_size_adjust.h"],
      default_value: "TextSizeAdjust::AdjustAuto()",
      getter: "GetTextSizeAdjust",
      type_name: "TextSizeAdjust",
      converter: "ConvertTextSizeAdjust",
      keywords: ["none", "auto"],
      typedom_types: ["Keyword", "Percentage"]
    },
    {
      name: "text-transform",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["capitalize", "uppercase", "lowercase", "none", "math-auto"],
      typedom_types: ["Keyword"],
      default_value: "none",
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "text-underline-offset",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "<length>",
      default_value: "Length()",
      name_for_methods: "TextUnderlineOffset",
      runtime_flag: "UnderlineOffsetThickness",
      converter: "ConvertTextUnderlineOffset",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      valid_for_first_letter: true,
    },
    {
      name: "text-underline-position",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_size: 4,
      field_template: "primitive",
      default_value: "kTextUnderlinePositionAuto",
      name_for_methods: "TextUnderlinePosition",
      type_name: "unsigned",
      converter: "ConvertTextUnderlinePosition",
      keywords: ["auto", "from-font", "under", "left", "right"],
      typedom_types: ["Keyword"],
      valid_for_first_letter: true,
    },
    {
      name: "top",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "surround",
      field_template: "<length>",
      keywords: ["auto"],
      default_value: "Length()",
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthOrAuto",
      computed_value_comparable: true,
    },
    {
      name: "touch-action",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_size: 6, // FIXME: Make this use "kTouchActionBits".
      field_template: "primitive",
      include_paths: ["third_party/blink/renderer/platform/graphics/touch_action.h"],
      default_value: "TouchAction::kAuto",
      type_name: "TouchAction",
      converter: "ConvertFlags<blink::TouchAction>",
      keywords: ["auto", "none", "pan-x", "pan-left", "pan-right", "pan-y", "pan-up", "pan-down", "pinch-zoom", "manipulation"],
      typedom_types: ["Keyword"]
    },
    {
      name: "transform",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      layout_dependent: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/transforms/transform_operations.h"],
      keywords: ["none"],
      default_value: "EmptyTransformOperations()",
      typedom_types: ["Keyword", "Transform"],
      type_name: "TransformOperations",
      converter: "ConvertTransformOperations",
    },
    {
      name: "transform-box",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_template: "keyword",
      keywords: ["fill-box", "view-box"],
      default_value: "view-box",
      typedom_types: ["Keyword"]
    },
    {
      name: "transform-origin",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      layout_dependent: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/style/transform_origin.h"],
      default_value: "TransformOrigin(Length::Percent(50.0), Length::Percent(50.0), 0)",
      getter: "GetTransformOrigin",
      type_name: "TransformOrigin",
      converter: "ConvertTransformOrigin",
    },
    {
      name: "transform-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["flat", "preserve-3d"],
      default_value: "flat",
      typedom_types: ["Keyword"],
      name_for_methods: "TransformStyle3D",
    },
    {
      name: "translate",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      layout_dependent: true,
      runtime_flag: "CSSIndependentTransformProperties",
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/platform/transforms/translate_transform_operation.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "TranslateTransformOperation",
      converter: "ConvertTranslate",
    },
    {
      name: "rotate",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      runtime_flag: "CSSIndependentTransformProperties",
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/platform/transforms/rotate_transform_operation.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "RotateTransformOperation",
      converter: "ConvertRotate",
    },
    {
      name: "scale",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      compositable: true,
      runtime_flag: "CSSIndependentTransformProperties",
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/platform/transforms/scale_transform_operation.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "ScaleTransformOperation",
      converter: "ConvertScale",
    },
    {
      name: "unicode-bidi",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      affected_by_all: false,
      field_template: "keyword",
      include_paths: ["third_party/blink/renderer/platform/text/unicode_bidi.h"],
      keywords: [
        "normal", "embed", "bidi-override", "isolate", "plaintext",
        "isolate-override"
      ],
      typedom_types: ["Keyword"],
      default_value: "normal",
      type_name: "UnicodeBidi",
      valid_for_marker: true,
    },
    {
      name: "vector-effect",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      svg: true,
      keywords: ["none", "non-scaling-stroke"],
      typedom_types: ["Keyword"]
    },
    {
      name: "vertical-align",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_custom_functions: ["inherit", "value"],
      typedom_types: ["Keyword", "Length", "Percentage"],
      keywords: ["baseline", "sub", "super", "text-top", "text-bottom", "middle"],
      valid_for_first_letter: true,
      computed_value_comparable: true,
      computed_value_compare_fields: ['VerticalAlign', 'GetVerticalAlignLength']
    },
    {
      name: "visibility",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      interpolable: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["visible", "hidden", "collapse"],
      typedom_types: ["Keyword"],
      default_value: "visible",
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "x",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      typedom_types: ["Length", "Percentage"],
      converter: "ConvertLength",
    },
    {
      name: "y",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      svg: true,
      typedom_types: ["Length", "Percentage"],
      converter: "ConvertLength",
    },
    {
      name: "appearance",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_size: 5,
      field_template: "primitive",
      computed_style_custom_functions: ["getter"],
      default_value: "kNoControlPart",
      type_name: "ControlPart",
    },
    {
      name: "-webkit-appearance",
      alias_for: "appearance",
    },
    {
      name: "-webkit-app-region",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["none", "drag", "no-drag"],
      default_value: "none",
      name_for_methods: "DraggableRegionMode",
      style_builder_custom_functions: ["initial", "inherit", "value"],
    },
    {
      name: "-webkit-border-horizontal-spacing",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "inherited",
      field_template: "primitive",
      default_value: "0",
      name_for_methods: "HorizontalBorderSpacing",
      type_name: "short",
      converter: "ConvertComputedLength<short>",
      valid_for_first_letter: true,
    },
    {
      name: "-webkit-border-image",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_custom_functions: ["value"],
      valid_for_first_letter: true,
    },
    {
      name: "-webkit-border-vertical-spacing",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "inherited",
      field_template: "primitive",
      default_value: "0",
      name_for_methods: "VerticalBorderSpacing",
      type_name: "short",
      converter: "ConvertComputedLength<short>",
      valid_for_first_letter: true,
    },
    // For valid values of box-align see
    // http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/#alignment
    {
      name: "-webkit-box-align",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["stretch", "start", "center", "end", "baseline"],
      default_value: "stretch",
      type_name: "EBoxAlignment",
    },
    {
      name: "-webkit-box-decoration-break",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "box",
      field_template: "keyword",
      keywords: ["slice", "clone"],
      default_value: "slice",
    },
    {
      name: "-webkit-box-direction",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["normal", "reverse"],
      default_value: "normal",
    },
    {
      name: "-webkit-box-flex",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
    },
    {
      name: "-webkit-box-ordinal-group",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "primitive",
      default_value: "1",
      type_name: "unsigned",
      computed_style_custom_functions: ["setter"],
    },
    {
      name: "-webkit-box-orient",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["horizontal", "vertical"],
      default_value: "horizontal",
    },
    {
      name: "-webkit-box-pack",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["start", "center", "end", "justify"],
      default_value: "start",
    },
    {
      name: "-webkit-box-reflect",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "pointer",
      include_paths: ["third_party/blink/renderer/core/style/style_reflection.h"],
      wrapper_pointer_name: "scoped_refptr",
      default_value: "nullptr",
      type_name: "StyleReflection",
      converter: "ConvertBoxReflect",
    },
    {
      name: "column-count",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "1",
      type_name: "unsigned short",
      computed_style_custom_functions: ["setter"],
      style_builder_template: "auto",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Number"]
    },
    {
      name: "column-gap",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length.h"],
      default_value: "base::nullopt",
      type_name: "base::Optional<Length>",
      converter: "ConvertGapLength",
      keywords: ["normal"],
      typedom_types: ["Keyword", "Length", "Percentage"],
    },
    {
      name: "row-gap",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/length.h"],
      default_value: "base::nullopt",
      type_name: "base::Optional<Length>",
      converter: "ConvertGapLength",
      keywords: ["normal"],
      typedom_types: ["Keyword", "Length", "Percentage"],
    },
    {
      name: "column-rule-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      keywords: ["currentcolor"],
      typedom_types: ["Keyword"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
    },
    {
      name: "column-rule-style",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: [
        "none", "hidden", "inset", "groove", "outset", "ridge", "dotted",
        "dashed", "solid", "double"
      ],
      default_value: "none",
      type_name: "EBorderStyle",
      typedom_types: ["Keyword"]
    },
    {
      name: "column-rule-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/geometry/layout_unit.h"],
      default_value: "LayoutUnit(3)",
      type_name: "LayoutUnit",
      computed_style_custom_functions: ["initial", "getter", "setter"],
      converter: "ConvertLineWidth<unsigned short>",
      keywords: ["thin", "medium", "thick"],
      typedom_types: ["Keyword", "Length"],
    },
    {
      name: "column-span",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["none", "all"],
      default_value: "none",
      getter: "GetColumnSpan",
      typedom_types: ["Keyword"],
    },
    {
      name: "column-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "0.0f",
      type_name: "float",
      computed_style_custom_functions: ["setter"],
      style_builder_template: "auto",
      converter: "ConvertComputedLength<float>",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length"],
    },
    {
      name: "-webkit-highlight",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/wtf/text/atomic_string.h"],
      default_value: "g_null_atom",
      type_name: "AtomicString",
      converter: "ConvertString<CSSValueID::kNone>",
    },
    {
      name: "-webkit-hyphenate-character",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/platform/wtf/text/atomic_string.h"],
      default_value: "AtomicString()",
      name_for_methods: "HyphenationString",
      type_name: "AtomicString",
      converter: "ConvertString<CSSValueID::kAuto>",
    },
    {
      name: "-webkit-line-break",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["auto", "loose", "normal", "strict", "after-white-space", "anywhere"],
      default_value: "auto",
      type_name: "LineBreak",
    },
    {
      name: "line-break",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      type_name: "LineBreak",
      keywords: ["auto", "loose", "normal", "strict", "anywhere"],
      typedom_types: ["Keyword"],
      valid_for_marker: true,
    },
    // An Apple extension.
    {
      name: "-webkit-line-clamp",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "external",
      default_value: "0",
      type_name: "int",
    },
    {
      name: "-webkit-mask-box-image-outset",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_box",
      style_builder_template_args: {
        modifier_type: "Outset",
      },
    },
    {
      name: "-webkit-mask-box-image-repeat",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "mask_box",
      style_builder_template_args: {
        modifier_type: "Repeat",
      },
    },
    {
      name: "-webkit-mask-box-image-slice",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_box",
      style_builder_template_args: {
        modifier_type: "Slice",
      },
    },
    {
      name: "-webkit-mask-box-image-source",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_custom_functions: ["value"],
    },
    {
      name: "-webkit-mask-box-image-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_box",
      style_builder_template_args: {
        modifier_type: "Width",
      },
    },
    {
      name: "-webkit-mask-clip",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "Clip",
      },
    },
    {
      name: "-webkit-mask-composite",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "Composite",
      },
    },
    {
      name: "-webkit-mask-image",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "Image",
        fill_type_getter: "GetImage"
      },
    },
    {
      name: "-webkit-mask-origin",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "Origin",
      },
    },
    {
      name: "-webkit-mask-position-x",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "PositionX",
      },
    },
    {
      name: "-webkit-mask-position-y",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "PositionY",
      },
    },
    {
      name: "-webkit-mask-repeat-x",
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "RepeatX",
      },
    },
    {
      name: "-webkit-mask-repeat-y",
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "RepeatY",
      },
    },
    {
      name: "-webkit-mask-size",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      style_builder_template: "mask_layer",
      style_builder_template_args: {
        fill_type: "Size",
      },
    },
    {
      name: "-webkit-perspective-origin-x",
      property_methods: ["ParseSingleValue"],
      interpolable: true,
      converter: "ConvertLength",
    },
    {
      name: "-webkit-perspective-origin-y",
      property_methods: ["ParseSingleValue"],
      interpolable: true,
      converter: "ConvertLength",
    },
    {
      name: "-webkit-print-color-adjust",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["economy", "exact"],
      default_value: "economy",
    },
    {
      name: "-webkit-rtl-ordering",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "keyword",
      keywords: ["logical", "visual"],
      default_value: "logical",
      name_for_methods: "RtlOrdering",
      setter: "SetRtlOrdering",
      type_name: "EOrder",
    },
    {
      name: "-webkit-ruby-position",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["before", "after"],
      default_value: "before",
      type_name: "RubyPosition",
      converter: "ConvertRubyPosition",
    },
    {
      name: "ruby-position",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      type_name: "RubyPosition",
      converter: "ConvertRubyPosition",
      surrogate_for: "-webkit-ruby-position",
    },
    {
      name: "-webkit-tap-highlight-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "<color>",
      default_value: "StyleColor(LayoutTheme::TapHighlightColor())",
      converter: "ConvertStyleColor",
      affected_by_forced_colors: true,
    },
    {
      name: "-webkit-text-combine",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      name_for_methods: "TextCombine",
    },
    {
      name: "-webkit-text-emphasis-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
      affected_by_forced_colors: true,
      valid_for_marker: true,
    },
    {
      name: "-webkit-text-emphasis-position",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_size: 2,
      field_template: "primitive",
      default_value: "TextEmphasisPosition::kOverRight",
      type_name: "TextEmphasisPosition",
      converter: "ConvertTextTextEmphasisPosition",
      valid_for_marker: true,
    },
    {
      name: "-webkit-text-emphasis-style",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      style_builder_custom_functions: ["initial", "inherit", "value"],
      valid_for_marker: true,
    },
    {
      name: "-webkit-text-fill-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
    },
    {
      name: "-webkit-text-security",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["none", "disc", "circle", "square"],
      default_value: "none",
    },
    {
      name: "-webkit-text-stroke-color",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal", "ColorIncludingFallback"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter"],
      converter: "ConvertStyleColor",
      style_builder_template: "color",
    },
    {
      name: "-webkit-text-stroke-width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "primitive",
      default_value: "0",
      type_name: "float",
      converter: "ConvertTextStrokeWidth",
    },
    {
      name: "-webkit-transform-origin-x",
      property_methods: ["ParseSingleValue"],
      interpolable: true,
      converter: "ConvertLength",
    },
    {
      name: "-webkit-transform-origin-y",
      property_methods: ["ParseSingleValue"],
      interpolable: true,
      converter: "ConvertLength",
    },
    {
      name: "-webkit-transform-origin-z",
      property_methods: ["ParseSingleValue"],
      interpolable: true,
      converter: "ConvertComputedLength<float>",
    },
    {
      name: "-webkit-user-drag",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      field_group: "*",
      field_template: "keyword",
      keywords: ["auto", "none", "element"],
      default_value: "auto",
    },
    {
      name: "-webkit-user-modify",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["read-only", "read-write", "read-write-plaintext-only"],
      default_value: "read-only",
    },
    {
      name: "user-select",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      keywords: ["auto", "none", "text", "all"],
      typedom_types: ["Keyword"],
      default_value: "auto",
    },
    {
      name: "white-space",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      independent: true,
      inherited: true,
      field_template: "multi_keyword", // We use a bitflag field due peformance issues
      keywords: [
        "none", "normal", "pre", "pre-wrap", "pre-line", "nowrap", "-webkit-nowrap", "break-spaces"
      ],
      typedom_types: ["Keyword"],
      default_value: "normal",
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "widows",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      field_group: "*",
      field_template: "primitive",
      computed_style_custom_functions: ["setter"],
      default_value: "2",
      type_name: "short",
      typedom_types: ["Number"]
    },
    {
      name: "width",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
      interpolable: true,
      layout_dependent: true,
      field_group: "box",
      field_template: "<length>",
      keywords: ["auto", "fit-content", "min-content", "max-content"],
      default_value: "Length()",
      typedom_types: ["Keyword", "Length", "Percentage"],
      converter: "ConvertLengthSizing",
      computed_value_comparable: true,
    },
    {
      name: "will-change",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      keywords: ["auto"],
      typedom_types: ["Keyword"]
    },
    {
      name: "word-break",
      property_methods: ["CSSValueFromComputedStyleInternal"],
      inherited: true,
      field_group: "*",
      field_template: "keyword",
      // Word Break Values. Matches WinIE and CSS3
      keywords: ["normal", "break-all", "keep-all", "break-word"],
      default_value: "normal",
      typedom_types: ["Keyword"],
      valid_for_marker: true,
    },
    {
      name: "word-spacing",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      inherited: true,
      converter: "ConvertSpacing",
      keywords: ["normal"],
      typedom_types: ["normal"],
      typedom_types: ["Keyword", "Length"],
      valid_for_first_letter: true,
      valid_for_marker: true,
    },
    {
      name: "z-index",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      interpolable: true,
      field_group: "box",
      field_template: "primitive",
      default_value: "0",
      type_name: "int",
      computed_style_custom_functions: ["setter"],
      style_builder_template: "auto",
      keywords: ["auto"],
      typedom_types: ["Keyword", "Number"]
    },

    // CSS logical props
    {
      name: "inline-size",
      property_methods: ["ParseSingleValue"],
      layout_dependent: true,
      direction_aware_options: {
        resolver: "inline",
        physical_group: "size",
      },
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
    },
    {
      name: "block-size",
      property_methods: ["ParseSingleValue"],
      layout_dependent: true,
      direction_aware_options: {
        resolver: "block",
        physical_group: "size",
      },
      keywords: ["auto"],
      typedom_types: ["Keyword", "Length", "Percentage"],
    },
    {
      name: "min-inline-size",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline",
        physical_group: "min-size",
      },
      typedom_types: ["Length", "Percentage"],
    },
    {
      name: "min-block-size",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block",
        physical_group: "min-size",
      },
      typedom_types: ["Length", "Percentage"],
    },
    {
      name: "max-inline-size",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline",
        physical_group: "max-size",
      },
      keywords: ["none"],
      typedom_types: ["Keyword", "Length", "Percentage"],
    },
    {
      name: "max-block-size",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block",
        physical_group: "max-size",
      },
      keywords: ["none"],
      typedom_types: ["Keyword", "Length", "Percentage"],
    },
    {
      name: "margin-inline-start",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "margin",
      },
      typedom_types: ["Length", "Percentage"],
      keywords: ["auto"],
      valid_for_first_letter: true,
    },
    {
      name: "margin-inline-end",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "margin",
      },
      typedom_types: ["Length", "Percentage"],
      keywords: ["auto"],
      valid_for_first_letter: true,
    },
    {
      name: "margin-block-start",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "margin",
      },
      typedom_types: ["Length", "Percentage"],
      keywords: ["auto"],
      valid_for_first_letter: true,
    },
    {
      name: "margin-block-end",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "margin",
      },
      typedom_types: ["Length", "Percentage"],
      keywords: ["auto"],
      valid_for_first_letter: true,
    },
    {
      name: "padding-inline-start",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "padding",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "padding-inline-end",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "padding",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "padding-block-start",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "padding",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "padding-block-end",
      layout_dependent: true,
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "padding",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "border-inline-start-width",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "border-width",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-inline-start-style",
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "border-style",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-inline-start-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-inline-end-width",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "border-width",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-inline-end-style",
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "border-style",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-inline-end-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-block-start-width",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "border-width",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-block-start-style",
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "border-style",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-block-start-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-block-end-width",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "border-width",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-block-end-style",
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "border-style",
      },
      valid_for_first_letter: true,
    },
    {
      name: "border-block-end-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "inset-inline-start",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "inset",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "inset-inline-end",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "inset",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "inset-block-start",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "inset",
      },
      typedom_types: ["Length", "Percentage"]
    },
    {
      name: "inset-block-end",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "inset",
      },
      typedom_types: ["Length", "Percentage"]
    },

    // Non-standard direction aware properties

    {
      name: "-webkit-border-end-color",
      alias_for: "border-inline-end-color",
    },
    {
      name: "-webkit-border-end-style",
      alias_for: "border-inline-end-style",
    },
    {
      name: "-webkit-border-end-width",
      alias_for: "border-inline-end-width",
    },
    {
      name: "-webkit-border-start-color",
      alias_for: "border-inline-start-color",
    },
    {
      name: "-webkit-border-start-style",
      alias_for: "border-inline-start-style",
    },
    {
      name: "-webkit-border-start-width",
      alias_for: "border-inline-start-width",
    },
    {
      name: "-webkit-border-before-color",
      alias_for: "border-block-start-color",
    },
    {
      name: "-webkit-border-before-style",
      alias_for: "border-block-start-style",
    },
    {
      name: "-webkit-border-before-width",
      alias_for: "border-block-start-width",
    },
    {
      name: "-webkit-border-after-color",
      alias_for: "border-block-end-color",
    },
    {
      name: "-webkit-border-after-style",
      alias_for: "border-block-end-style",
    },
    {
      name: "-webkit-border-after-width",
      alias_for: "border-block-end-width",
    },
    {
      name: "-webkit-margin-end",
      alias_for: "margin-inline-end",
    },
    {
      name: "-webkit-margin-start",
      alias_for: "margin-inline-start",
    },
    {
      name: "-webkit-margin-before",
      alias_for: "margin-block-start",
    },
    {
      name: "-webkit-margin-after",
      alias_for: "margin-block-end",
    },
    {
      name: "-webkit-padding-end",
      alias_for: "padding-inline-end",
    },
    {
      name: "-webkit-padding-start",
      alias_for: "padding-inline-start",
    },
    {
      name: "-webkit-padding-before",
      alias_for: "padding-block-start",
    },
    {
      name: "-webkit-padding-after",
      alias_for: "padding-block-end",
    },
    {
      name: "-webkit-logical-width",
      alias_for: "inline-size",
    },
    {
      name: "-webkit-logical-height",
      alias_for: "block-size",
    },
    {
      name: "-webkit-min-logical-width",
      alias_for: "min-inline-size",
    },
    {
      name: "-webkit-min-logical-height",
      alias_for: "min-block-size",
    },
    {
      name: "-webkit-max-logical-width",
      alias_for: "max-inline-size",
    },
    {
      name: "-webkit-max-logical-height",
      alias_for: "max-block-size",
    },

    // Properties that we ignore in the StyleBuilder.
    // TODO(timloh): This seems wrong, most of these shouldn't reach the
    // StyleBuilder
    {
      name: "all",
      affected_by_all: false,
      style_builder_template: "empty",
    },
    // TODO(hjkim3323@gmail.com): Remove -internal-font-size-delta.
    // fontSizeDelta execCommand does not need separate CSS property.
    {
      name: "-internal-font-size-delta",
      property_methods: ["ParseSingleValue"],
      style_builder_template: "empty",
    },
    {
      name: "-webkit-text-decorations-in-effect",
      property_methods: ["ParseSingleValue", "CSSValueFromComputedStyleInternal"],
      inherited: true,
      style_builder_template: "empty",
    },

    // Descriptor only names
    {
      name: "font-display",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "max-zoom",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "min-zoom",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "orientation",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "src",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "unicode-range",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "user-zoom",
      is_descriptor: true,
      is_property: false,
    },
    {
      name: "viewport-fit",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "DisplayCutoutAPI",
    },
    {
      name: "syntax",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSVariables2AtProperty",
    },
    {
      name: "initial-value",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSVariables2AtProperty",
    },
    {
      name: "inherits",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSVariables2AtProperty",
    },
    {
      name: "source",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSScrollTimeline",
    },
    {
      name: "start",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSScrollTimeline",
    },
    {
      name: "end",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSScrollTimeline",
    },
    {
      name: "time-range",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSScrollTimeline",
    },
    {
      name: "ascent-override",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSFontMetricsOverride",
    },
    {
      name: "descent-override",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSFontMetricsOverride",
    },
    {
      name: "advance-override",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSFontMetricsOverride",
    },
    {
      name: "line-gap-override",
      is_descriptor: true,
      is_property: false,
      runtime_flag: "CSSFontMetricsOverride",
    },

    // Shorthands
    {
      name: "animation",
      longhands: [
        "animation-duration", "animation-timing-function", "animation-delay",
        "animation-iteration-count", "animation-direction",
        "animation-fill-mode", "animation-play-state", "animation-name",
        "animation-timeline"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "background",
      longhands: [
        "background-image", "background-position-x", "background-position-y",
        "background-size", "background-repeat-x", "background-repeat-y",
        "background-attachment", "background-origin", "background-clip",
        "background-color"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "background-position",
      longhands: ["background-position-x", "background-position-y"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "background-repeat",
      longhands: ["background-repeat-x", "background-repeat-y"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border",
      longhands: [
        "border-top-color", "border-top-style", "border-top-width",
        "border-right-color", "border-right-style", "border-right-width",
        "border-bottom-color", "border-bottom-style", "border-bottom-width",
        "border-left-color", "border-left-style", "border-left-width",
        "border-image-source", "border-image-slice", "border-image-width",
        "border-image-outset", "border-image-repeat"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-block",
      longhands: [
        "border-block-start-color", "border-block-start-style", "border-block-start-width",
        "border-block-end-color", "border-block-end-style", "border-block-end-width"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-block-color",
      longhands: ["border-block-start-color", "border-block-end-color"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-block-end",
      longhands: [
        "border-block-end-width", "border-block-end-style",
        "border-block-end-color"
      ],
      property_methods: ["ParseShorthand"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "border",
      },
    },
    {
      name: "border-block-start",
      longhands: [
        "border-block-start-width", "border-block-start-style",
        "border-block-start-color"
      ],
      property_methods: ["ParseShorthand"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "border",
      },
    },
    {
      name: "border-block-style",
      longhands: ["border-block-start-style", "border-block-end-style"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-block-width",
      longhands: ["border-block-start-width", "border-block-end-width"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-bottom",
      longhands: [
        "border-bottom-width", "border-bottom-style", "border-bottom-color"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-color",
      longhands: [
        "border-top-color", "border-right-color", "border-bottom-color",
        "border-left-color"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-image",
      longhands: [
        "border-image-source", "border-image-slice", "border-image-width",
        "border-image-outset", "border-image-repeat"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-inline",
      longhands: [
        "border-inline-start-color", "border-inline-start-style", "border-inline-start-width",
        "border-inline-end-color", "border-inline-end-style", "border-inline-end-width"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-inline-color",
      longhands: ["border-inline-start-color", "border-inline-end-color"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-inline-end",
      longhands: [
        "border-inline-end-width", "border-inline-end-style",
        "border-inline-end-color"
      ],
      property_methods: ["ParseShorthand"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "border",
      },
    },
    {
      name: "border-inline-start",
      longhands: [
        "border-inline-start-width", "border-inline-start-style",
        "border-inline-start-color"
      ],
      property_methods: ["ParseShorthand"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "border",
      },
    },
    {
      name: "border-inline-style",
      longhands: ["border-inline-start-style", "border-inline-end-style"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-inline-width",
      longhands: ["border-inline-start-width", "border-inline-end-width"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-left",
      longhands: [
        "border-left-width", "border-left-style", "border-left-color"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-radius",
      longhands: [
        "border-top-left-radius", "border-top-right-radius",
        "border-bottom-right-radius", "border-bottom-left-radius"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-right",
      longhands: [
        "border-right-width", "border-right-style", "border-right-color"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-spacing",
      longhands: [
        "-webkit-border-horizontal-spacing", "-webkit-border-vertical-spacing"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-style",
      longhands: [
        "border-top-style", "border-right-style", "border-bottom-style",
        "border-left-style"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      keywords: ["none"],
    },
    {
      name: "border-top",
      longhands: ["border-top-width", "border-top-style", "border-top-color"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "border-width",
      longhands: [
        "border-top-width", "border-right-width", "border-bottom-width",
        "border-left-width"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "flex",
      longhands: ["flex-grow", "flex-shrink", "flex-basis"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "flex-flow",
      longhands: ["flex-direction", "flex-wrap"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "font",
      longhands: [
        "font-style", "font-variant-ligatures", "font-variant-caps",
        "font-variant-numeric", "font-variant-east-asian", "font-weight",
        "font-stretch", "font-size", "line-height", "font-family"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "font-variant",
      longhands: [
        "font-variant-ligatures", "font-variant-caps",
        "font-variant-numeric", "font-variant-east-asian"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      is_descriptor: true,
    },
    {
      name: "grid",
      longhands: [
        "grid-template-rows", "grid-template-columns", "grid-template-areas",
        "grid-auto-flow", "grid-auto-rows", "grid-auto-columns"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      layout_dependent: true,
    },
    {
      name: "place-content",
      longhands: ["align-content", "justify-content"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "place-items",
      longhands: ["align-items", "justify-items"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "place-self",
      longhands: ["align-self", "justify-self"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-area",
      longhands: [
        "grid-row-start", "grid-column-start", "grid-row-end",
        "grid-column-end"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-column",
      longhands: ["grid-column-start", "grid-column-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-column-gap",
      longhands: ["column-gap"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-row-gap",
      longhands: ["row-gap"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "gap",
      longhands: ["row-gap", "column-gap"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-gap",
      longhands: ["row-gap", "column-gap"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-row",
      longhands: ["grid-row-start", "grid-row-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "grid-template",
      longhands: [
        "grid-template-rows", "grid-template-columns", "grid-template-areas"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      layout_dependent: true,
    },
    {
      name: "inset",
      longhands: ["top", "right", "bottom", "left"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "inset-block",
      longhands: ["inset-block-start", "inset-block-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "inset-inline",
      longhands: ["inset-inline-start", "inset-inline-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "list-style",
      longhands: ["list-style-position", "list-style-image", "list-style-type"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "margin",
      longhands: ["margin-top", "margin-right", "margin-bottom", "margin-left"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      layout_dependent: true,
    },
    {
      name: "margin-block",
      longhands: ["margin-block-start", "margin-block-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "margin-inline",
      longhands: ["margin-inline-start", "margin-inline-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "marker",
      longhands: ["marker-start", "marker-mid", "marker-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      svg: true,
    },
    {
      name: "offset",
      longhands: [
        "offset-position", "offset-path", "offset-distance", "offset-rotate",
        "offset-anchor"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "outline",
      longhands: ["outline-color", "outline-style", "outline-width"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "overflow",
      longhands: ["overflow-x", "overflow-y"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "overscroll-behavior",
      longhands: ["overscroll-behavior-x", "overscroll-behavior-y"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "padding",
      longhands: [
        "padding-top", "padding-right", "padding-bottom", "padding-left"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
      layout_dependent: true,
    },
    {
      name: "padding-block",
      longhands: ["padding-block-start", "padding-block-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "padding-inline",
      longhands: ["padding-inline-start", "padding-inline-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "page-break-after",
      longhands: ["break-after"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "page-break-before",
      longhands: ["break-before"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "page-break-inside",
      longhands: ["break-inside"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "scroll-margin",
      longhands: ["scroll-margin-top", "scroll-margin-right", "scroll-margin-bottom", "scroll-margin-left"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "scroll-margin-block",
      longhands: ["scroll-margin-block-start", "scroll-margin-block-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "scroll-margin-inline",
      longhands: ["scroll-margin-inline-start", "scroll-margin-inline-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "scroll-padding",
      longhands: [
        "scroll-padding-top", "scroll-padding-right", "scroll-padding-bottom",
        "scroll-padding-left"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "scroll-padding-block",
      longhands: ["scroll-padding-block-start", "scroll-padding-block-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "scroll-padding-inline",
      longhands: ["scroll-padding-inline-start", "scroll-padding-inline-end"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "text-decoration",
      longhands: ["text-decoration-line", "text-decoration-thickness", "text-decoration-style", "text-decoration-color"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "transition",
      longhands: [
        "transition-property", "transition-duration",
        "transition-timing-function", "transition-delay"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-border-after",
      alias_for: "border-block-end",
    },
    {
      name: "-webkit-border-before",
      alias_for: "border-block-start",
    },
    {
      name: "-webkit-border-end",
      alias_for: "border-inline-end",
    },
    {
      name: "-webkit-border-start",
      alias_for: "border-inline-start",
    },
    {
      name: "-webkit-column-break-after",
      longhands: ["break-after"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-column-break-before",
      longhands: ["break-before"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-column-break-inside",
      longhands: ["break-inside"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "column-rule",
      longhands: [
        "column-rule-width", "column-rule-style", "column-rule-color"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "columns",
      longhands: ["column-width", "column-count"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-mask",
      longhands: [
        "-webkit-mask-image", "-webkit-mask-position-x",
        "-webkit-mask-position-y", "-webkit-mask-size", "-webkit-mask-repeat-x",
        "-webkit-mask-repeat-y", "-webkit-mask-origin", "-webkit-mask-clip"
      ],
      property_methods: ["ParseShorthand"],
    },
    {
      name: "-webkit-mask-box-image",
      longhands: [
        "-webkit-mask-box-image-source", "-webkit-mask-box-image-slice",
        "-webkit-mask-box-image-width", "-webkit-mask-box-image-outset",
        "-webkit-mask-box-image-repeat"
      ],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-mask-position",
      longhands: ["-webkit-mask-position-x", "-webkit-mask-position-y"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-mask-repeat",
      longhands: ["-webkit-mask-repeat-x", "-webkit-mask-repeat-y"],
      property_methods: ["ParseShorthand", "CSSValueFromComputedStyleInternal"],
    },
    {
      name: "-webkit-text-emphasis",
      longhands: ["-webkit-text-emphasis-style", "-webkit-text-emphasis-color"],
      property_methods: ["ParseShorthand"],
    },
    {
      name: "-webkit-text-stroke",
      longhands: ["-webkit-text-stroke-width", "-webkit-text-stroke-color"],
      property_methods: ["ParseShorthand"],
    },

    // Visited properties.
    {
      name: "-internal-visited-color",
      visited_property_for: "color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      inherited: true,
      field_group: "inherited",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor(Color::kBlack)",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      style_builder_custom_functions: ["initial", "inherit", "value"],
      priority: "High",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
      valid_for_marker: true,
    },
    {
      name: "-internal-visited-caret-color",
      visited_property_for: "caret-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_auto_color.h"],
      default_value: "StyleAutoColor::AutoColor()",
      type_name: "StyleAutoColor",
      converter: "ConvertStyleAutoColor",
      computed_style_custom_functions: ["getter"],
      style_builder_template: "visited_color",
      style_builder_template_args: {
        initial_color: "StyleAutoColor::AutoColor",
      },
    },
    {
      name: "-internal-visited-column-rule-color",
      visited_property_for: "column-rule-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*->multi-col",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter","setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
    },
    {
      name: "-internal-visited-background-color",
      visited_property_for: "background-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor(Color::kTransparent)",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      style_builder_template_args: {
        initial_color: "ComputedStyleInitialValues::InitialBackgroundColor",
      },
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "-internal-visited-border-left-color",
      visited_property_for: "border-left-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-right-color",
      visited_property_for: "border-right-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-top-color",
      visited_property_for: "border-top-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-bottom-color",
      visited_property_for: "border-bottom-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-inline-start-color",
      visited_property_for: "border-inline-start-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-start",
        physical_group: "visited-border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-inline-end-color",
      visited_property_for: "border-inline-end-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "inline-end",
        physical_group: "visited-border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-block-start-color",
      visited_property_for: "border-block-start-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-start",
        physical_group: "visited-border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-border-block-end-color",
      visited_property_for: "border-block-end-color",
      property_methods: ["ParseSingleValue"],
      direction_aware_options: {
        resolver: "block-end",
        physical_group: "visited-border-color",
      },
      valid_for_first_letter: true,
    },
    {
      name: "-internal-visited-fill",
      visited_property_for: "fill",
      property_methods: ["ParseSingleValue"],
      inherited: true,
      svg: true,
      initial: "InitialFillPaint",
      setter: "SetInternalVisitedFillPaint",
      getter: "FillPaint",
      converter: "ConvertSVGPaint",
      affected_by_forced_colors: true,
    },
    {
      name: "-internal-visited-outline-color",
      visited_property_for: "outline-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
      valid_for_cue: true,
    },
    {
      name: "-internal-visited-stroke",
      visited_property_for: "stroke",
      property_methods: ["ParseSingleValue"],
      inherited: true,
      svg: true,
      initial: "InitialStrokePaint",
      setter: "SetInternalVisitedStrokePaint",
      getter: "StrokePaint",
      converter: "ConvertSVGPaint",
      affected_by_forced_colors: true,
    },
    {
      name: "-internal-visited-text-decoration-color",
      visited_property_for: "text-decoration-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
      valid_for_first_letter: true,
      valid_for_cue: true,
    },
    {
      name: "-internal-visited-text-emphasis-color",
      visited_property_for: "-webkit-text-emphasis-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
      affected_by_forced_colors: true,
    },
    {
      name: "-internal-visited-text-fill-color",
      visited_property_for: "-webkit-text-fill-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
    },
    {
      name: "-internal-visited-text-stroke-color",
      visited_property_for: "-webkit-text-stroke-color",
      property_methods: ["ParseSingleValue", "ColorIncludingFallback"],
      inherited: true,
      field_group: "*",
      field_template: "external",
      include_paths: ["third_party/blink/renderer/core/css/style_color.h"],
      default_value: "StyleColor::CurrentColor()",
      type_name: "StyleColor",
      computed_style_custom_functions: ["getter", "setter"],
      converter: "ConvertStyleColor",
      style_builder_template: "visited_color",
    },

    // Name: -internal-empty-line-height:
    // Value: none | fabricated
    //    If the element is inline or contains visible text, this property has
    //    no effect.
    //
    // 'none'
    //   The box's intrinsic height is 0, and it defines no baseline.
    // 'fabricated'
    //   The box has intrinsic height and baseline, computed from the current
    //   font metrics.
    {
      name: "-internal-empty-line-height",
      property_methods: ["ParseSingleValue" ],
      inherited: false,
      field_group: "*",
      field_template: "primitive",
      type_name: "bool",
      default_value: "false",
      name_for_methods: "HasLineIfEmpty",
      converter: "ConvertInternalEmptyLineHeight",
    },

    // Aliases; these map to the same CSSPropertyID
    {
      name: "-epub-caption-side",
      alias_for: "caption-side",
    },
    {
      name: "-epub-text-combine",
      alias_for: "-webkit-text-combine",
    },
    {
      name: "-epub-text-emphasis",
      alias_for: "-webkit-text-emphasis",
    },
    {
      name: "-epub-text-emphasis-color",
      alias_for: "-webkit-text-emphasis-color",
    },
    {
      name: "-epub-text-emphasis-style",
      alias_for: "-webkit-text-emphasis-style",
    },
    {
      name: "-epub-text-orientation",
      alias_for: "-webkit-text-orientation",
    },
    {
      name: "-epub-text-transform",
      alias_for: "text-transform",
    },
    {
      name: "-epub-word-break",
      alias_for: "word-break",
    },
    {
      name: "-epub-writing-mode",
      alias_for: "-webkit-writing-mode",
    },
    {
      name: "-webkit-align-content",
      alias_for: "align-content",
    },
    {
      name: "-webkit-align-items",
      alias_for: "align-items",
    },
    {
      name: "-webkit-align-self",
      alias_for: "align-self",
    },
    {
      name: "-webkit-animation",
      alias_for: "animation",
    },
    {
      name: "-webkit-animation-delay",
      alias_for: "animation-delay",
    },
    {
      name: "-webkit-animation-direction",
      alias_for: "animation-direction",
    },
    {
      name: "-webkit-animation-duration",
      alias_for: "animation-duration",
    },
    {
      name: "-webkit-animation-fill-mode",
      alias_for: "animation-fill-mode",
    },
    {
      name: "-webkit-animation-iteration-count",
      alias_for: "animation-iteration-count",
    },
    {
      name: "-webkit-animation-name",
      alias_for: "animation-name",
    },
    {
      name: "-webkit-animation-play-state",
      alias_for: "animation-play-state",
    },
    {
      name: "-webkit-animation-timing-function",
      alias_for: "animation-timing-function",
    },
    {
      name: "-webkit-backface-visibility",
      alias_for: "backface-visibility",
    },
    // -webkit-background-clip accepts "content", "padding", and "border" values
    // See crbug.com/604023
    {
      name: "-webkit-background-clip",
      alias_for: "background-clip",
    },
    // -webkit-background-origin accepts "content", "padding", and "border"
    // values. See crbug.com/604023
    {
      name: "-webkit-background-origin",
      alias_for: "background-origin"
    },
    // "-webkit-background-size: 10px" behaves as "background-size: 10px 10px"
    {
      name: "-webkit-background-size",
      alias_for: "background-size",
    },
    {
      name: "-webkit-border-bottom-left-radius",
      alias_for: "border-bottom-left-radius",
    },
    {
      name: "-webkit-border-bottom-right-radius",
      alias_for: "border-bottom-right-radius",
    },
    // "-webkit-border-radius: 1px 2px" behaves as "border-radius: 1px / 2px"
    {
      name: "-webkit-border-radius",
      alias_for: "border-radius",
    },
    {
      name: "-webkit-border-top-left-radius",
      alias_for: "border-top-left-radius",
    },
    {
      name: "-webkit-border-top-right-radius",
      alias_for: "border-top-right-radius",
    },
    {
      name: "-webkit-box-shadow",
      alias_for: "box-shadow",
    },
    {
      name: "-webkit-box-sizing",
      alias_for: "box-sizing",
    },
    {
      name: "-webkit-clip-path",
      alias_for: "clip-path",
    },
    {
      name: "-webkit-column-count",
      alias_for: "column-count",
    },
    {
      name: "-webkit-column-gap",
      alias_for: "column-gap",
    },
    {
      name: "-webkit-column-rule",
      alias_for: "column-rule",
    },
    {
      name: "-webkit-column-rule-color",
      alias_for: "column-rule-color",
    },
    {
      name: "-webkit-column-rule-style",
      alias_for: "column-rule-style",
    },
    {
      name: "-webkit-column-rule-width",
      alias_for: "column-rule-width",
    },
    {
      name: "-webkit-column-span",
      alias_for: "column-span",
    },
    {
      name: "-webkit-column-width",
      alias_for: "column-width",
    },
    {
      name: "-webkit-columns",
      alias_for: "columns",
    },
    {
      name: "-webkit-filter",
      alias_for: "filter",
    },
    {
      name: "-webkit-flex",
      alias_for: "flex",
    },
    {
      name: "-webkit-flex-basis",
      alias_for: "flex-basis",
    },
    {
      name: "-webkit-flex-direction",
      alias_for: "flex-direction",
    },
    {
      name: "-webkit-flex-flow",
      alias_for: "flex-flow",
    },
    {
      name: "-webkit-flex-grow",
      alias_for: "flex-grow",
    },
    {
      name: "-webkit-flex-shrink",
      alias_for: "flex-shrink",
    },
    {
      name: "-webkit-flex-wrap",
      alias_for: "flex-wrap",
    },
    {
      name: "-webkit-font-feature-settings",
      alias_for: "font-feature-settings",
    },
    {
      name: "-webkit-justify-content",
      alias_for: "justify-content",
    },
    {
      name: "-webkit-opacity",
      alias_for: "opacity",
    },
    {
      name: "-webkit-order",
      alias_for: "order",
    },
    {
      name: "-webkit-perspective",
      alias_for: "perspective",
    },
    {
      name: "-webkit-perspective-origin",
      alias_for: "perspective-origin",
    },
    {
      name: "-webkit-shape-image-threshold",
      alias_for: "shape-image-threshold",
    },
    {
      name: "-webkit-shape-margin",
      alias_for: "shape-margin",
    },
    {
      name: "-webkit-shape-outside",
      alias_for: "shape-outside",
    },
    {
      name: "-webkit-text-size-adjust",
      alias_for: "text-size-adjust",
    },
    {
      name: "-webkit-transform",
      alias_for: "transform",
    },
    {
      name: "-webkit-transform-origin",
      alias_for: "transform-origin",
    },
    {
      name: "-webkit-transform-style",
      alias_for: "transform-style",
    },
    {
      name: "-webkit-transition",
      alias_for: "transition",
    },
    {
      name: "-webkit-transition-delay",
      alias_for: "transition-delay",
    },
    {
      name: "-webkit-transition-duration",
      alias_for: "transition-duration",
    },
    {
      name: "-webkit-transition-property",
      alias_for: "transition-property",
    },
    {
      name: "-webkit-transition-timing-function",
      alias_for: "transition-timing-function",
    },
    {
      name: "-webkit-user-select",
      alias_for: "user-select",
    },
    {
      name: "word-wrap",
      alias_for: "overflow-wrap",
    },
  ],
}
