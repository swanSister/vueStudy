window.onload = function(){
  const Swan = { template: '<div class="animal-img" ><img src="./css/img/swan.jpg"/></div>'}
  const Charles = { template: '<div class="animal-img" ><img  src="./css/img/charles.jpg"/></div>'}
  const Tobam = { template: '<div class="animal-img" ><img src="./css/img/tobam.jpg"/></div>'}
  const Detail = { template: '<div class="animal-template">'+
    '<div class="animal-name">{{$route.params.name}}</div>'+
    '<div class="animal-age">{{$route.params.age}}살</div>'+
    '<div class="animal-place">{{$route.params.place}}에서 주워옴.</div>'+
  '</div>'}

  const AnimalData = {
    "swan":{
      name:"스완",
      age:8,
      place:"유기견 보호소"
    },
    "charlse":{
      name:"찰스",
      age:4,
      place:"시골"
    },
    "tobam":{
      name:"토밤",
      age:2,
      place:"대전역"
    }
  }
  const routes = [
    { path: '/swan', component: Swan
    },
    { path: '/charlse', component: Charles
    },
    { path: '/tobam', component: Tobam
    },
    { name : 'swan', path: '/detail:/swan', component: Detail
    },
    { name : 'charlse', path: '/detail:/charlse', component: Detail
    },
    { name : 'tobam', path: '/detail:/tobam', component: Detail
    }
  ]

  const router = new VueRouter({
    routes
  })

  function checkAnimalPath(fullPath){
    var path = fullPath.replace("/","")
    if(path == "swan" || path == "charlse" || path == "tobam"){
      return true;
    }
    return false;
  }
  function checkDetailPath(fullPath){
    var path = fullPath.replace("/","")
    if(path.indexOf("detail") >= 0){
      return true;
    }
    return false;
  }

  var app = new Vue({
  	router,
    el: '#app',
    data () {
      var toggleDetail = false, toggleHome = false
      if(checkAnimalPath(this.$route.path)){
        toggleDetail = true
      }
      if(checkDetailPath(this.$route.path)){
        toggleHome = true
      }
     return {
       toggleDetail: toggleDetail,
       toggleHome: toggleHome
     }
   },
   watch:{
     '$route'(from, to){
       if(checkAnimalPath(from.path)){
         this.toggleDetail = true
         this.toggleHome = false
       }else{
         this.toggleDetail = false
       }
     }
   },
    methods: {
     goDetail:function(){
       this.toggleHome = true
       if(checkAnimalPath(this.$route.path)){
         var path = this.$route.path.replace("/","")
         this.$router.push({ path:'/detail', name : path, params:AnimalData[path]})
       }
     },
     goHome:function(){
       this.toggleHome = false
        this.$router.push({ path:'/'})
     }
  }
  })
}
