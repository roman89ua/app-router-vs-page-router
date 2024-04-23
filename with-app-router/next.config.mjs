
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

            {
                protocol: "http",
                hostname: 'localhost',
                port: '1337',
                pathname: "/uploads/**",
            }

        ]

    }
};

export default nextConfig;
