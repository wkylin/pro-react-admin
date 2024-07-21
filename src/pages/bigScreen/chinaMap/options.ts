import { graphic } from 'echarts/core'

//  地图数据
const mapData = {
  citys: [
    {
      name: '延寿',
      value: [128.331644, 45.451897, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '临江',
      value: [126.918087, 41.811979, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '嘉兴',
      value: [120.755486, 30.746129, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '四平',
      value: [124.350398, 43.16642, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '营口',
      value: [122.235418, 40.667012, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '密云',
      value: [116.801346, 40.35874, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '威海',
      value: [122.12042, 37.513068, 32],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '杭州',
      value: [120.15507, 30.274085, 10],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '集安',
      value: [126.194031, 41.125307, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '贵阳',
      value: [106.630154, 26.647661, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '抚顺',
      value: [123.957208, 41.880872, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '海门',
      value: [121.181615, 31.871173, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '珠海',
      value: [113.576726, 22.270715, 9],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '河北',
      value: [114.475704, 38.584854, -19],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '深圳',
      value: [114.057868, 22.543099, 14],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '黄浦',
      value: [121.484443, 31.231763, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '蓬莱',
      value: [120.758848, 37.810661, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '吉林',
      value: [126.549572, 43.837883, -364],
      symbolSize: 14,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '甘肃',
      value: [103.826308, 36.059421, -2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '龙井',
      value: [129.427066, 42.766311, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '茂名',
      value: [110.925456, 21.662999, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '丹东',
      value: [124.354707, 40.0005, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '晋中',
      value: [112.752695, 37.687024, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '浙江',
      value: [120.152792, 30.267447, -2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '海城',
      value: [122.685217, 40.882377, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '溆浦',
      value: [110.594921, 27.908281, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '北京',
      value: [116.407526, 39.90403, -14],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '铁岭',
      value: [123.726166, 42.223769, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '大同',
      value: [113.61244, 40.040295, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '金坛',
      value: [119.597897, 31.723247, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '齐齐哈尔',
      value: [126.661669, 45.742347, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '咸阳',
      value: [108.708991, 34.329605, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '四川',
      value: [104.075931, 30.651652, -5],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '福田',
      value: [114.055036, 22.52153, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '盘锦',
      value: [122.070714, 41.119997, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '中山',
      value: [113.392782, 22.517646, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '福建',
      value: [119.295144, 26.10078, -1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '泰顺',
      value: [119.717649, 27.556884, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '宝山',
      value: [131.401589, 46.577167, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '庆安',
      value: [127.507825, 46.880102, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '海淀',
      value: [116.298056, 39.959912, 32],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '大兴',
      value: [116.341395, 39.726929, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '桦川',
      value: [130.719081, 47.023001, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '惠州',
      value: [114.416196, 23.111847, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '青岛',
      value: [120.38264, 36.067082, 52],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '朝阳',
      value: [116.443108, 39.92147, 17],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '沈阳',
      value: [123.431475, 41.805698, 41],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '菏泽',
      value: [115.480656, 35.23375, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '南通',
      value: [120.894291, 31.980172, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '南充',
      value: [106.110698, 30.837793, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '双城',
      value: [126.312745, 45.383263, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '南京',
      value: [118.796877, 32.060255, 17],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '新疆',
      value: [87.627704, 43.793026, -2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '成都',
      value: [104.066541, 30.572269, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '陕西',
      value: [108.954239, 34.265472, -2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '黄岛',
      value: [120.04619, 35.872664, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '温州',
      value: [120.699367, 27.994267, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '石家庄',
      value: [114.51486, 38.042307, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '邢台',
      value: [114.504844, 37.070589, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '赣州',
      value: [114.93503, 25.831829, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '义乌',
      value: [120.075058, 29.306841, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '南昌',
      value: [115.858198, 28.682892, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '闵行',
      value: [121.381709, 31.112813, 18],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '长宁',
      value: [121.424624, 31.220367, 7],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '道里',
      value: [126.616957, 45.755777, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '乳山',
      value: [121.539765, 36.919816, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '双流',
      value: [103.923648, 30.574473, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '广州',
      value: [113.264435, 23.129163, 13],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '西城',
      value: [116.365868, 39.912289, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '佳木斯',
      value: [130.318917, 46.799923, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '皇姑',
      value: [123.44197, 41.824796, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '榆树',
      value: [126.533146, 44.840288, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '临汾',
      value: [111.518976, 36.088005, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '上海',
      value: [121.473701, 31.230416, 44],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '内蒙古',
      value: [111.765618, 40.817498, -23],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '尚志',
      value: [128.009895, 45.209586, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '湖里',
      value: [118.146769, 24.512905, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '台州',
      value: [121.420757, 28.656386, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '潍坊',
      value: [119.161756, 36.706774, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '苏州',
      value: [120.585316, 31.298886, 14],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '房山',
      value: [116.143267, 39.749144, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '即墨',
      value: [120.447128, 36.389639, 15],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '舒兰',
      value: [126.965607, 44.406106, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '延吉',
      value: [129.508946, 42.891255, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '三河',
      value: [117.078295, 39.982718, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '大连',
      value: [121.614682, 38.914003, 40],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '辉南',
      value: [126.046912, 42.684993, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '无锡',
      value: [120.31191, 31.49117, 14],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '常州',
      value: [119.973987, 31.810689, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '广西',
      value: [108.327546, 22.815478, -1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '泉州',
      value: [118.675676, 24.874132, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '昌平',
      value: [116.231204, 40.22066, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '海阳',
      value: [121.158434, 36.776378, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '郑州',
      value: [113.625368, 34.7466, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '东城',
      value: [116.416357, 39.928353, 10],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '黄骅',
      value: [117.330048, 38.371383, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '武侯',
      value: [104.04339, 30.641982, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '鸡东',
      value: [131.12408, 45.260412, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '龙口',
      value: [120.477813, 37.646108, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '汤原',
      value: [129.905072, 46.730706, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '湖北',
      value: [114.341862, 30.546498, -4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '克拉玛依',
      value: [84.889207, 45.579889, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '厦门',
      value: [118.089425, 24.479834, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '哈尔滨',
      value: [126.534967, 45.803775, 8],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '秦皇岛',
      value: [119.600493, 39.935385, 7],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '江苏',
      value: [118.763232, 32.061707, -1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '常熟',
      value: [120.752481, 31.654376, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '烟台',
      value: [121.447935, 37.463822, 24],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '和平',
      value: [117.21451, 39.116949, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '环翠',
      value: [122.123444, 37.501991, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '宣武门外东大街',
      value: [116.378888, 39.899332, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '张家港',
      value: [120.553284, 31.870367, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '临安',
      value: [119.724733, 30.233873, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '延安',
      value: [109.489727, 36.585455, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '天津',
      value: [117.200983, 39.084158, 28],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '城阳',
      value: [120.39631, 36.307064, 15],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '石景山',
      value: [116.222982, 39.906611, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '长沙',
      value: [112.938814, 28.228209, 5],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '安徽',
      value: [117.284923, 31.861184, -1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '昆山',
      value: [120.980737, 31.385598, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '徐汇',
      value: [121.436525, 31.188523, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '东港',
      value: [124.152705, 39.863008, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '廊坊',
      value: [116.683752, 39.538047, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '鞍山',
      value: [122.994329, 41.108647, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '海陵',
      value: [119.919425, 32.491016, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '黑龙江',
      value: [126.661669, 45.742347, -198],
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '西藏',
      value: [91.117212, 29.646923, -1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '河南',
      value: [113.274379, 34.445122, 0],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '湖南',
      value: [112.98381, 28.112444, -1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '佛山',
      value: [113.121416, 23.021548, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '珲春',
      value: [130.366036, 42.862821, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '扬州',
      value: [119.412966, 32.39421, 5],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '日照',
      value: [119.526888, 35.416377, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '唐山',
      value: [118.180194, 39.630867, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '同江',
      value: [132.510919, 47.642707, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '荣成',
      value: [122.486658, 37.16516, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '虎林',
      value: [132.93721, 45.762686, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '武汉',
      value: [114.305393, 30.593099, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '合肥',
      value: [117.227239, 31.820587, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '荆州',
      value: [112.239741, 30.335165, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '丰台',
      value: [116.287149, 39.858427, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '山东',
      value: [117.020359, 36.66853, -6],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '舟山',
      value: [122.207216, 29.985295, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '连云港',
      value: [119.221611, 34.596653, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '西安',
      value: [108.940175, 34.341568, 3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '济南',
      value: [117.12, 36.651216, 4],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '绵阳',
      value: [104.679114, 31.46745, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '辽宁',
      value: [123.42944, 41.835441, -58],
      symbolSize: 3,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '山西',
      value: [112.562398, 37.873532, -3],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#58B3CC',
        },
      },
    },
    {
      name: '呼和浩特',
      value: [111.749181, 40.842585, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '河西',
      value: [117.223372, 39.109563, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '兴和',
      value: [113.834173, 40.872301, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '重庆',
      value: [106.551557, 29.56301, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '胶州',
      value: [120.033382, 36.26468, 5],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '宁波',
      value: [121.550357, 29.874557, 10],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '滨海',
      value: [119.820831, 33.990334, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '太原',
      value: [112.548879, 37.87059, 2],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '鸡西',
      value: [130.969333, 45.295075, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '兰山',
      value: [118.347707, 35.051729, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '阳泉',
      value: [113.580519, 37.856972, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '勃利',
      value: [130.592171, 45.755063, 1],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
    {
      name: '长春',
      value: [125.323544, 43.817072, 8],
      symbolSize: 2,
      itemStyle: {
        normal: {
          color: '#F58158',
        },
      },
    },
  ],
}

const mapOptions = (params: any) => ({
  title: {
    show: false,
    text: '全国物流输送图',
    left: 'center',
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    show: false,
  },
  geo: {
    nameMap: {
      China: '中国',
    },
    map: 'china',
    label: {
      emphasis: {
        show: false,
      },
    },
    zoom: 1.2,
    itemStyle: {
      normal: {
        borderColor: 'rgba(255,209,163, .5)', // 区域边框颜色
        areaColor: 'rgba(73,86,166,.1)', // 区域颜色
        borderWidth: 0.5, // 区域边框宽度
        shadowBlur: 5,
        shadowColor: 'rgba(107,91,237,.7)',
      },
      emphasis: {
        borderColor: '#FFD1A3',
        areaColor: 'rgba(102,105,240,.3)',
        borderWidth: 1,
        shadowBlur: 5,
        shadowColor: 'rgba(135,138,255,.5)',
      },
    },
  },
  series: [
    {
      name: '地点',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke',
      },
      label: {
        emphasis: {
          show: true,
          position: 'right',
          formatter: '{b}',
        },
      },
      symbolSize: 2,
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: '#46bee9',
        },
      },
      data: mapData.citys,
    },
    {
      name: '线路',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      zoom: 1,
      large: true,
      effect: {
        show: true,
        constantSpeed: 30,
        symbol: 'pin',
        symbolSize: 3,
        trailLength: 0,
      },
      lineStyle: {
        normal: {
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#58B3CC',
              },
              {
                offset: 1,
                color: '#F58158',
              },
            ],
            false
          ),
          width: 1,
          opacity: 0.2,
          curveness: 0.1,
        },
      },
      data: params.moveLines,
    },
  ],
})

export default mapOptions
