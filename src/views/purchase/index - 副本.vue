<template>
    <div id="purchase">
        <div class="banner limit-max-width">
            <div class="banner-title flex-column-center">
                <h1>互联网赋能农业</h1>
                <h4>
                    INTERNET ENABLED AGRICULTURE
                </h4>
                <div class="hr">
                    <div class="hr-vertical"></div>
                </div>
                <div class="hr2"></div>
            </div>
        </div>
        <el-row class="limit-max-width" id="anchor" ref="Anchor">
            <div class="table-select limit-max-width-inset">
                <div class="flex sticky">
                    <EasySlidSelect :list="tableTypeList" class="easySlidSelect" @change="
					(info)=>{
						changeSelect(info);
					}
					" ref="EasySlidSelect"></EasySlidSelect>
                    <!-- <el-tabs style="max-width: 880px;" @tab-click="handleClick" class="table-box">
                      <el-tab-pane class="table-item" :label="item.title" v-for="(item,index) in tableTypeList" :key="index"></el-tab-pane>
                    </el-tabs> -->
                    <el-button size="small" class="release" @click="sendRelease()">
                        发布需求
                    </el-button>
                </div>
                <el-table :data="showData" v-loading="isLoading" ref="TableDom" :key="itemKey"
                          :header-cell-style="{ textAlign: 'center','background-color':'#F9F9F9' }"
                          :cell-style="{ textAlign: 'center' }" stripe>
                    <el-table-column label="需求产品" width="200px">
                        <template v-slot="{ row }">
                            <div class="table-select-tips">
                                <img :src="row.goodsInfoImage" @click="operationclick(row.ghInfoId)"/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="" width="400px">
                        <template v-slot="{ row }">
                            <div class="table-select-tips">
                                <div style="width: 336px;">
                                    <p @click="operationclick(row.ghInfoId)">{{ row.goodsName }}</p>
                                    <span>{{ row.goodsModel }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsBrand" label="品牌"></el-table-column>
                    <el-table-column prop="productAddress" label="产地"></el-table-column>
                    <el-table-column label="操作">
                        <template v-slot="{row}">
                            <button class="operationbtn" @click="operationclick(row.ghInfoId)">
                                我要采购
                            </button>
                        </template>
                    </el-table-column>
                </el-table>

                <TablePagination :total="tableQueryOption.total" :current="tableQueryOption.current"
                                 :size="tableQueryOption.size"
                                 layout="prev, pager, next,jumper" @currentChange="
							val => {
								tableQueryOption.current = val;
								getTableData();
							}
						" @sizeChange="
							val => {
								tableQueryOption.size = val;
								getTableData();
							}
						"/>

            </div>
        </el-row>
    </div>
</template>
<script>
    import EasySlidSelect from "@/components/EasySlidSelect/index.vue"
    import TablePagination from '@/components/TablePagination/index.vue';
    import ApiAuth from '@/api/auth.js';
import scrollToMixin from "../../utils/scrollToMixin.js";

export default {
	mixins:[scrollToMixin],
        data() {
            return {
                itemKey: "0",
                tableTypeList: [
                    {
                        goodsType: '粮油作物'
                    },
                    {
                        goodsType: '毛茶'
                    },
                    {
                        goodsType: '瓜果蔬菜'
                    },
                    {
                        goodsType: '花卉苗木药材'
                    },
                    // {
                    //     goodsType: '经济作物'
                    // },
                    {
                        goodsType: '畜禽水产'
                    },
                ],
                isLoading: false,
                tableData: [[{
                    ghInfoId: 11,
                    goodsBrand: "圣府第",
                    productAddress: "济宁市",
                    goodsInfoImage: require("@/assets/images/testimg/ly/hsy/1.jpg"),
                    goodsName: "圣府第 厂家直销 5L食用油植物油 古法压榨 一级浓香小榨花生油",
                    goodsModel: "5L/瓶",
                    unit: '瓶',
                    goodsImageList1: require("@/assets/images/testimg/ly/hsy/2.jpg"),
                    goodsImageList2: require("@/assets/images/testimg/ly/hsy/3.jpg"),
                    goodsImageList3: require("@/assets/images/testimg/ly/hsy/4.jpg"),
                    goodsImageList4: require("@/assets/images/testimg/ly/hsy/5.jpg"),
                }, {
                    ghInfoId: 12,
                    goodsBrand: "掌中禾",
                    productAddress: "哈尔滨市",
                    goodsInfoImage: require("@/assets/images/testimg/ly/xm/1.jpg"),
                    goodsName: "年份新米黑龙江东北大米5kg长粒香米粳米",
                    goodsModel: "5000（g）",
                    unit: 'g',
                    goodsImageList1: require("@/assets/images/testimg/ly/xm/2.jpg"),
                    goodsImageList2: require("@/assets/images/testimg/ly/xm/3.jpg"),
                    goodsImageList3: require("@/assets/images/testimg/ly/xm/4.jpg"),
                    goodsImageList4: require("@/assets/images/testimg/ly/xm/5.jpg"),
                }
                ], [
                    {
                        ghInfoId: 31,
                        goodsBrand: "滇艺农",
                        productAddress: "西双版纳",
                        goodsInfoImage: require("@/assets/images/testimg/mc/pec/1.jpg"),
                        goodsName: "厂家批发云南普洱茶 2021年帕沙头春茶 晒青毛茶散装茶叶产地现货",
                        goodsModel: "500g",
                        unit: '包',
                        goodsImageList1: require("@/assets/images/testimg/mc/pec/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/mc/pec/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/mc/pec/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/mc/pec/5.jpg"),
                    }, {
                        ghInfoId: 32,
                        goodsBrand: "淘缘",
                        productAddress: "泉州市",
                        goodsInfoImage: require("@/assets/images/testimg/mc/tgy/1.jpg"),
                        goodsName: "新茶上市秋茶安溪铁观音内安溪高海拔产地消青浓香型高端商务茶",
                        goodsModel: "清香型（消青）",
                        unit: '斤',
                        goodsImageList1: require("@/assets/images/testimg/mc/tgy/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/mc/tgy/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/mc/tgy/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/mc/tgy/5.jpg"),
                    },

                ], [
                    {
                        ghInfoId: 41,
                        goodsBrand: "其他",
                        productAddress: "漳州市",
                        goodsInfoImage: require("@/assets/images/testimg/ggsc/hxy/1.jpg"),
                        goodsName: "福建平和管溪柚子红心蜜柚渠道供货礼品订单一件代发应季水果批发",
                        goodsModel: "具有品种特征，端正（mm）",
                        unit: '个',
                        goodsImageList1: require("@/assets/images/testimg/ggsc/hxy/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/ggsc/hxy/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/ggsc/hxy/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/ggsc/hxy/5.jpg"),
                    },
                    {
                        ghInfoId: 42,
                        goodsBrand: "其他",
                        productAddress: "潍坊市",
                        goodsInfoImage: require("@/assets/images/testimg/ggsc/td/1.jpg"),
                        goodsName: "黄皮土豆十斤装中大个包邮土豆农家土豆马铃薯现挖黄心大洋芋批发",
                        goodsModel: "十斤装,五斤",
                        unit: '斤',
                        goodsImageList1: require("@/assets/images/testimg/ggsc/td/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/ggsc/td/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/ggsc/td/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/ggsc/td/5.jpg"),
                    }
                ], [
                    {
                        ghInfoId: 51,
                        goodsBrand: "耀强药业",
                        productAddress: "毫州市",
                        goodsInfoImage: require("@/assets/images/testimg/hhmm/hq/1.jpg"),
                        goodsName: "黄芪中药材黄芪 滋补甘肃岷县黄芪 斜片圆片打粉新货批发大货供应",
                        goodsModel: "本品不能代替药物",
                        unit: '颗',
                        goodsImageList1: require("@/assets/images/testimg/hhmm/hq/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/hhmm/hq/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/hhmm/hq/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/hhmm/hq/5.jpg"),
                    },
                    {
                        ghInfoId: 52,
                        goodsBrand: "背靠大树",
                        productAddress: "泰安市",
                        goodsInfoImage: require("@/assets/images/testimg/hhmm/xcs/1.jpg"),
                        goodsName: "泰安基地大量出售现货红油香椿小树 矮化香椿树",
                        goodsModel: "成苗",
                        unit: '颗',
                        goodsImageList1: require("@/assets/images/testimg/hhmm/xcs/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/hhmm/xcs/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/hhmm/xcs/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/hhmm/xcs/5.jpg"),
                    },
                    {
                        ghInfoId: 53,
                        goodsBrand: "博郡",
                        productAddress: "泰安市",
                        goodsInfoImage: require("@/assets/images/testimg/hhmm/lzs/1.jpg"),
                        goodsName: "果树基地大量批发1-5公分金丝枣树 梨枣树 葫芦枣树",
                        goodsModel: "红油香椿苗,大棚矮化香椿苗",
                        unit: '颗',
                        goodsImageList1: require("@/assets/images/testimg/hhmm/lzs/2.jpg"),
                        goodsImageList2: require("@/assets/images/testimg/hhmm/lzs/3.jpg"),
                        goodsImageList3: require("@/assets/images/testimg/hhmm/lzs/4.jpg"),
                        goodsImageList4: require("@/assets/images/testimg/hhmm/lzs/5.jpg"),
                    },
                ], [{
                    ghInfoId: 21,
                    goodsBrand: "闽正",
                    productAddress: "缅甸",
                    goodsInfoImage: require("@/assets/images/testimg/xmsc/dzx/1.jpg"),
                    goodsName: "E缅甸雄蟹空运 孟加拉青蟹鲜活 公螃蟹野生1只80g左右香辣蟹",
                    goodsModel: "80g",
                    unit: '只',
                    goodsImageList1: require("@/assets/images/testimg/xmsc/dzx/2.jpg"),
                    goodsImageList2: require("@/assets/images/testimg/xmsc/dzx/3.jpg"),
                    goodsImageList3: require("@/assets/images/testimg/xmsc/dzx/4.jpg"),
                    goodsImageList4: require("@/assets/images/testimg/xmsc/dzx/5.jpg"),
                }, {
                    ghInfoId: 22,
                    goodsBrand: "华鑫牧业",
                    productAddress: "忻州市",
                    goodsInfoImage: require("@/assets/images/testimg/xmsc/n/1.jpg"),
                    goodsName: "夏洛莱活牛价格 西门塔尔牛 利木赞孕牛肉牛犊牛苗小牛崽种牛",
                    goodsModel: "利木赞牛",
                    unit: '只',
                    goodsImageList1: require("@/assets/images/testimg/xmsc/n/2.jpg"),
                    goodsImageList2: require("@/assets/images/testimg/xmsc/n/3.jpg"),
                    goodsImageList3: require("@/assets/images/testimg/xmsc/n/4.jpg"),
                    goodsImageList4: require("@/assets/images/testimg/xmsc/n/5.jpg"),
                }
                ]],
                showData: [],
                showType: 0,
                tableQueryOption: {
                    total: 10,
                    current: 1,
                    size: 10
                },
            };
        },
        components: {
            EasySlidSelect,
            TablePagination,
        },
        computed: {},
        mounted() {
            this.cgGoodsTypeList();
            this.cglist();
        },
        methods: {
            getTableData() {
                this.cglist();
                // let first = (this.tableQueryOption.current - 1) * this.tableQueryOption.size;
                // for (let i = 0; i < this.tableQueryOption.size; i++) {
                //     if (first + i < this.tableQueryOption.total) {
                //         this.showData[i] = this.tableData[this.showType][first + i];
                //         this.itemKey = Math.random();
                //     }
                //     else {
                //         delete this.showData[i];
                //     }
                // }

                this.$routerUtil.toPath('/purchase', {showType: this.showType, current: this.tableQueryOption.current});
            },

            changeSelect(info) {
                this.showType = info.index;
                this.tableQueryOption.current = 1;
                this.tableQueryOption.total = this.tableData.length;
                // this.$routerUtil.toPath('/purchase', {showType: this.showType, current: this.tableQueryOption.current});
                this.getTableData();
            },

            operationclick(index) {
                // let info;
                // for (let i = 0; i < this.tableData.length; i++) {
                //     for (let j = 0; j < this.tableData[i].length; j++) {
                //         if (index == this.tableData[i][j].ghInfoId) {
                //             info = this.tableData[i][j];
                //             break;
                //         }
                //     }
                // }
                // let url = '/#/goodsDetail/index?';
                // let message = {
                //     fromMsg: "purchase",
                //     id: index,
                //     goodsName: info.goodsName,
                //     productAddress: info.productAddress,
                //     goodsModel: info.goodsModel,
                //     goodsImageList: info.goodsInfoImage,
                //     goodsImageList1: info.goodsImageList1,
                //     goodsImageList2: info.goodsImageList2,
                //     goodsImageList3: info.goodsImageList3,
                //     goodsImageList4: info.goodsImageList4,
                //     type: this.tableTypeList[this.showType].goodsType,
                //     showType: this.showType,
                //     current: this.tableQueryOption.current,
                //     unit:info.unit,
                // };
                //
                // for(var i in message){
                //     if(message[i]!=undefined){
                //         url+=(i+"="+message[i]+"&");
                //     }
                // }
                //
                // url= url.substring(0, url.length - 1);
                // url=url.replace('%','-');
                //
                // this.$routerUtil.newWindow(url, "_blank");
                // this.$routerUtil.toPath('/goodsDetail/index', {
                //     fromMsg: "purchase",
                //     id: index,
                // });

                let url = '/#/goodsDetail/index?';
                let message = {
                    fromMsg: "purchase",
                    id: index,
                };

                for(var i in message){
                    if(message[i]!=undefined){
                        url+=(i+"="+message[i]+"&");
                    }
                }

                url= url.substring(0, url.length - 1);
                url=url.replace('%','-');

                this.$routerUtil.newWindow(url, "_blank");
            },
            sendRelease() {
                this.$routerUtil.toPath('/purchase/release', {
                    showType: this.showType,
                    current: this.tableQueryOption.current,
                });
            },

            async cglist() {
                let current = this.tableQueryOption.current;
                let size = this.tableQueryOption.size;
                let goodsTypeId = this.showType;
                let res;
                if (goodsTypeId == -1) {
                    res = await ApiAuth.cglist({
                        current,
                        size,
                    });
                } else {
                    res = await ApiAuth.cglist({
                        current,
                        size,
                        goodsTypeId,
                    });
                }

                console.log(res.data)
                if (res.code == 10200) {
                    this.tableQueryOption.total = res.data.total;
                    this.showData = res.data.records;
                }
            },

            async cgGoodsTypeList() {
                let res = await ApiAuth.cgGoodsTypeList();
                console.log(res.data)
                if (res.code == 10200) {
                    this.tableTypeList = [{
                        goodsType: '全部',
                        goodsTypeId: -1,
                    },]
                    this.tableTypeList = this.tableTypeList.concat(res.data)
                }
            },

        }
    };
</script>
<style lang="scss" scoped="scoped">
    #purchase {
        background-color: #f2f3f5;

        .banner {
            background-image: url(../../assets/images/supply/banner_woyaocg.png);
            //height: 15.375rem;
            height: 350px;

            .banner-title {
                height: 100%;
                color: #FFFFFF;
                padding: 0 400px 0 0;

                h1 {
                    font-size: 3.75rem;
                    display: inline-block;
                    margin-bottom: 20px;
                    text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
                    font-weight: bold;
                    letter-spacing: 10px;
                    /*line-grid: ;*/
                }

                .hr {
                    height: 0.125rem;
                    background-color: #FFFFFF;
                    opacity: 0.7;
                    width: 370px;
                    /*margin-bottom: 20px;*/
                    margin-top: 20px;
                    margin-right: 150px;
                    .hr-vertical {
                        background-color: #FFFFFF;
                        width: 2px;
                        height: 65px;
                        margin-top: -65px;
                    }
                }

                .hr2 {
                    height: 0.125rem;
                    background-color: #FFFFFF;
                    opacity: 0.7;
                    width: 320px;
                    margin-bottom: 20px;
                    margin-top: 8px;
                    margin-left: 150px;

                }

                h4 {
                    font-size: 1.375rem;
                    font-weight: 500;
                    letter-spacing: 4px;
                }
            }
        }
		#anchor {
			min-height: 800px;
		}
        .table-select {
            background-color: #ffffff;
            margin-top: 1.875rem;
            margin-bottom: 1.875rem;
            // padding-bottom: 1rem;
            padding: 0 1rem 1rem 1rem;

            .sticky {
                position: sticky;
                top: 38px;
                left: 0;
                background-color: #FFFFFF;
                z-index: 100;
            }

            .table-box {
                .table-item {
                    width: 100px;
                }
            }

            .easySlidSelect {
                width: 880px;
            }

            .release {
                width: 90px;
                height: 36px;
                margin: 10px 20px 0 auto;
                background-color: $ThemeColor;
                color: white;
            }

            .table-select-tips {
                display: flex;
                flex-direction: row;
                height: 121px;

                img {
                    height: 120px;
                    width: 120px;
                    cursor: pointer;
                    margin: 0 auto;
                }

                div {
                    position: relative;
                    width: 336px;

                    p {
                        margin-left: 20px;
                        margin-top: 10px;
                        text-align: left;
                        color: #333333;
                        font-weight: bold;
                        cursor: pointer;
                    }

                    span {
                        position: absolute;
                        bottom: 10px;
                        left: 20px;
                        color: #999999;
                        text-align: left;
                    }
                }

            }

            .operationbtn {
                background-color: #ffffff;
                border: $ThemeColor 1px solid;
                border-radius: 2px;
                color: $ThemeColor;
                width: 90px;
                height: 36px;

                &:hover {
                    background-color: $ThemeColor;
                    color: #ffffff;
                }
            }
        }
    }
</style>
