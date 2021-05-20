const axios = require('axios')
window.exports = {
  'npm_search': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
      },
      search: (action, searchWord, callbackSetList) => {
        let list = []
        axios.get(`https://www.npmjs.com/search/suggestions?q=`+searchWord).then((res)=>{
          if (res.status === 200){
            if (res.data.length !== 0){
              for (let i = 0;i<res.data.length;i++){
                list.push({
                    title: res.data[i].name,
                    description: '版本：' + res.data[i].version + '  描述：' + res.data[i].description,
                    icon:'npmRed.png', // 图标
                    url: res.data[i].links['npm']
                  })
              }
              callbackSetList(list)
            } else {
              callbackSetList([])
            }
          }
        })
      },
      select: (action, itemData) => {
        window.utools.hideMainWindow()
        const url = itemData.url
        utools.shellOpenExternal(url);
        window.utools.outPlugin()
      },
      // 子输入框为空时的占位符，默认为字符串"搜索"
      placeholder: "搜索npm包"
    }
  }
}
