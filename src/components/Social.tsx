import { SOCIAL_MEDIA } from "../lib/constants"

const Socials = () => {
  return (
    <div>
        <ul className="flex gap-5">
            {SOCIAL_MEDIA.map(({src, alt, href})=>(
                <li key={src}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        <img src={src} height={30} width={30} className="hero-social_icons" alt={alt}/>
                    </a>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Socials