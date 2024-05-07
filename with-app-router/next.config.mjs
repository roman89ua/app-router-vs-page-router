
/** @type {import('next').NextConfig} */

const nextConfig = {
    // next line can be used for to export project as static website + build in out folder
    // output: "export"
    images: {
        // unoptimized file load
        // unoptimized: true,


        //custom file load
        // loader: "custom",
        // loaderFile: "customLoader.tsx",



        remotePatterns: [
            toRemotePattern(process.env.CMS_IMAGES_URL),
        ]

    }
};

function toRemotePattern(urlString) {
    const urlObject = new URL(urlString);

    return {
        protocol: urlObject.protocol.replace(":", ""),
        hostname: urlObject.hostname,
        port: urlObject.port ,
        pathname: urlObject.pathname,
    }
}

export default nextConfig;
