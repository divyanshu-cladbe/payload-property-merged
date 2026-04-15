"use client";

export default function NotFound() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#E91614] to-[#E05D31] text-white">
            {/* 404 Text */}
            <h1 className="text-5xl md:text-[200px] font-bold leading-none mb-6 tracking-tight">
                404!
            </h1>

            {/* Message */}
            <p className="text-lg md:text-2xl font-light text-white/95">
                This page cannot be found.
            </p>
        </div>
    );
}


// import { headers as getHeaders } from 'next/headers.js'
// import Image from 'next/image'
// import { getPayload } from 'payload'
// import React from 'react'
// import { fileURLToPath } from 'url'

// import config from '@/payload.config'
// import './styles.css'

// export default async function HomePage() {
//   const headers = await getHeaders()
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })
//   const { user } = await payload.auth({ headers })

//   const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

//   return (
//     <div className="home">
//       <div className="content">
//         <picture>
//           <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
//           <Image
//             alt="Payload Logo"
//             height={65}
//             src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
//             width={65}
//           />
//         </picture>
//         {!user && <h1>Welcome to your new project.</h1>}
//         {user && <h1>Welcome back, {user.email}</h1>}
//         <div className="links">
//           <a
//             className="admin"
//             href={payloadConfig.routes.admin}
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             Go to admin panel
//           </a>
//           <a
//             className="docs"
//             href="https://payloadcms.com/docs"
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             Documentation
//           </a>
//         </div>
//       </div>
//       <div className="footer">
//         <p>Update this page by editing</p>
//         <a className="codeLink" href={fileURL}>
//           <code>app/(frontend)/page.tsx</code>
//         </a>
//       </div>
//     </div>
//   )
// }