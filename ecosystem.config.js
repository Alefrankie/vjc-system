module.exports = {
    apps: [
        {
            name: "VJC System",
            script: "yarn start",
            watch: true,
            interpreter_args: "",
            exec_mode: "cluster",
            env_development: {
                "PORT": 3000,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 3000,
                "NODE_ENV": "production",
            }
        }
    ]
}
