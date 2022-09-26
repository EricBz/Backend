module.exports = {
  apps : [{
    name   : "server1",
    script : "./app.js",
    watch:true,
    env:{
      PORT:8080
    },
    exec_mode:"fork",//modo fork o cluster, por default queda fork.
    instances:1,
    args:"-a 2 b 30",
    node_args: "--harmony --expose-gc" //para las ve del gcollector
  },{
    name   : "server2",
    script : "./app.js",
    watch:true,
    env:{
      PORT:8081
    },
    exec_mode:"cluster",//modo fork o cluster, por default queda fork.
    instances:1,
    args:"-a 2 b 30",
    node_args: "--harmony --expose-gc" //para las ve del gcollector
  },{
    name   : "server3",
    script : "./app.js",
    watch:true,
    env:{
      PORT:8082
    },
    exec_mode:"cluster",//modo fork o cluster, por default queda fork.
    instances:1,
    args:"-a 2 b 30",
    node_args: "--harmony --expose-gc" //para las ve del gcollector
  },{
    name   : "server4",
    script : "./app.js",
    watch:true,
    env:{
      PORT:8083
    },
    exec_mode:"cluster",//modo fork o cluster, por default queda fork.
    instances:1,
    args:"-a 2 b 30",
    node_args: "--harmony --expose-gc" //para las ve del gcollector
  }
]
};
