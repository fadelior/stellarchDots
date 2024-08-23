const entry = App.configDir + '/ts/main.ts'
const outdir = '/tmp/ags/js'

App.addIcons(`${App.configDir}:x/assets`)

try {
    await Utils.execAsync([
        'bun', 'build', entry,
        '--outdir', outdir,
        '--external', 'resource://*',
        '--external', 'gi://*',
    ])
    await import(`file://${outdir}/main.js`)
} catch (error) {
    console.error(error)
}
