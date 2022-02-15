interface Config {
    name: string;
    path: string;
    version?: string;
}

interface App {
    fullPath: string;
    version?: string;
}

function applicationInit(config: Config) :App {
    let app = {fullPath: config.path+ config.name} as App
    if (config.version) {
        app.version = config.version;
    }
    return app
}

console.log(applicationInit(<Config> {path: '/home', name: 'user'}))