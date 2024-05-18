import { SocialIcon } from 'react-social-icons';
import styles from '../../css/footer.module.css'

const Footer = () => {

    return (
        // <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center p-3 border-top bg-dark" style={{position: "fixed", bottom: 0, width: "100%"}}>
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1">
                        {/* <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap" /></svg> */}
                    </a>
                    <span className="text-light">&copy; Moonlaugh</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <SocialIcon url="https://www.facebook.com/moonlaughFlatmeta" style={{width: "36px", height: "36px", marginLeft: '12px'}}/>
                    <SocialIcon url="https://www.tiktok.com/@moonlaugh_official" style={{width: "36px", height: "36px", marginLeft: '12px'}}/>
                    <SocialIcon url="https://github.com/thinhpd1906" style={{width: "36px", height: "36px", marginLeft: '12px'}} bgColor="#000"/>
                    {/* <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#twitter" /></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#instagram" /></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#facebook" /></svg></a></li> */}
                </ul>
            </footer>
        // </div>
    )
}

export default Footer;