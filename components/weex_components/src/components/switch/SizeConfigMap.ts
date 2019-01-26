interface SwitchSizeConfigItem {

    switchConfig: {
        width: number,
        height: number
    },
    core: {
        top: number,
        width: number,
        height: number
    },
    blk: {
        top: number,
        left: number,
        width: number,
        height: number
    },

    //blk 距离右侧的距离
    marginRight: number
}

type ConfigKey = "sm" | "md" | "lg";

const sm: SwitchSizeConfigItem = {
    switchConfig: {
        width: 84,
        height: 54,
    },
    core: {
        top: 0,
        width: 80,
        height: 50,
    },
    blk: {
        top: 0,
        left: 3,
        width: 42,
        height: 46,
    },
    marginRight: 8
};

const md: SwitchSizeConfigItem = {
    switchConfig: {
        width: 104,
        height: 64,
    },
    core: {
        top: 0,
        width: 100,
        height: 60,
    },
    blk: {
        top: 0,
        left: 5,
        width: 52,
        height: 56,
    },
    marginRight: 12
};

const lg: SwitchSizeConfigItem = {
    switchConfig: {
        width: 144,
        height: 84,
    },
    core: {
        top: 0,
        width: 140,
        height: 80,
    },
    blk: {
        top: 0,
        left: 5,
        width: 72,
        height: 76,
    },
    marginRight: 14
};


const SIZE_CONFIG: { [key: string]: SwitchSizeConfigItem } = {
    sm,
    md,
    lg
};


export {
    SIZE_CONFIG
}