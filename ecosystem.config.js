module.exports = {
  apps: [{
    name: "Echo Me",
    script: "./server.js",
    // exec_mode: "cluster",
    // instances: "max",
    cwd: "D:\\Echo Me",
    watch: false,
    max_memory_restart: "150M",
    // time: true,
    log_date_format: "DD-MM-YYYY HH:mm:ss",
    "env": {
      PORT: 3000,
      DB_USER: "snake",
      DB_PASSWORD: "sNaKe%235467"
    },
    "env_production": {
      PORT: 5000,
      DB_USER: "snake",
      DB_PASSWORD: "sNaKe%235467"
    }
  }]
}