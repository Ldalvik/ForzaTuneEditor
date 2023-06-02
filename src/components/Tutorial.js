// const fs = window.require('fs');
const Tutorial = () => {
    
    // fs.readdir('./', (_err, files) => files.forEach(file => console.log(file)))

    return (
        <div>
            <section>
                <h1>How to find your tune file</h1>
                <p>Downloaded tune files are stored in a local folder on your computer. Steam and Xbox (Microsoft) versions have these files in different locations, so be sure to read through the below tutorials to get the correct file.</p>
            </section>
            <section>
                <h3>If you play on the Xbox (Microsoft) version</h3>
                <h5 id="break">Location: C:/Users/[USER]/AppData/Local/Packages/Microsoft.624F8B84B80_8wekyb3d8bbwe/SystemAppData/wgs/[XUID]/
                </h5>
                <p>(You may have 3+ folders (ignore the <code>t</code> folder) in your <code>wgs</code> directory if you have multiple
                    accounts signed in.) If you don't know which XUID is yours, it should be the most recently modified
                    folder (after you download a tune). Once you're sure you have the right directory, look for a folder that was created 
                    at the time you downloaded the tune. If you filter by date modified, you may end up in the savegame folder accidentally.
                    To narrow it down, tune folders will ONLY have 2 1kb files and a container file. To get the tune file itself, hover over 
                    each file and find the one that is 378 bytes.
                </p>
            </section>
            <section>
                <h3>If you play on the Steam version</h3>
                <h5>Location: C:/Program Files (x86)/Steam/userdata/[STEAMID]/155136/remote/[XUID]/</h5>
                <p>Steam is a lot simpler. Download your tune and open up the most recently modified directory in the
                    <code>remote</code> folder. You should see names along the lines of <code>Tuning_####[date]####.Data</code>
                    as well as ones with <code>.header</code> and thumbnails. You want the one that ends in <code>.Data</code>.
                    Make sure it's the tune you downloaded by setting it to recently created/modified and checking the date.
                </p>
            </section>
        </div>
    )
}
export default Tutorial