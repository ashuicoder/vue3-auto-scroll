declare const _sfc_main: import("vue").DefineComponent<{
    hideScrollBar: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    speed: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    delay: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    control: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    backSpeed: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}, {
    props: any;
    wrapperRef: import("vue").Ref<HTMLDivElement | null>;
    scrollRef: import("vue").Ref<HTMLDivElement | null>;
    wrapperHeight: import("vue").Ref<number>;
    scrollHeight: import("vue").Ref<number>;
    scrollTop: import("vue").Ref<number>;
    timer: any;
    scrollId: any;
    init: () => void;
    control: () => void;
    handlepParse: () => void;
    handleContinue: () => void;
    handleScrollByMouse: () => void;
    scroll: () => void;
    end: () => void;
    backTop: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    hideScrollBar: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    speed: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    delay: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    control: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    backSpeed: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}>>, {
    hideScrollBar: boolean;
    speed: number;
    delay: number;
    control: boolean;
    backSpeed: number;
}>;
export default _sfc_main;
