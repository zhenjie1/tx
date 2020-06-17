<template>
    <ul class="toolMenu">
        <li class="left">
            <el-tooltip content="表情" placement="top"><i class="iconfont icon-biaoqing icon"></i></el-tooltip>
            <el-tooltip content="文件" placement="top"><i class="icon el-icon-folder"></i></el-tooltip>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.toolMenu{background-color: $bgColor;height: 40px;line-height: 40px;border-top: 1px solid $borderColor;box-sizing: border-box;
    .left{font-size: 0;
        .icon{width: 40px;height: 40px;line-height: 40px;text-align: center;display: inline-block;font-size: 16px;}
        .icon:hover{background-color: $bgHover;cursor: pointer;}
    }
}
</style>
