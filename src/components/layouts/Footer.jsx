import { Row, Col } from 'antd';
import useLayoutStore from '@/stores/store';
const Footer = ( ) => {
    const { isOpen } = useLayoutStore();
    const currentYear = new Date().getFullYear();
    const author = "Desarrollado por TC";

    return (
        <footer className="fixed bottom-0 w-full bg-gray-100" style={{ width: isOpen ? 'calc(100% - 250px)' : 'calc(100% - 70px)' , zIndex: 999999 }}>
            <Row className="h-9 p-1 px-3 flex items-center  " >
                <Col xs={24} sm={12} md={8} className="text-center sm:text-left">
                    <p>Copyrigth © {currentYear}</p>
                </Col>
                <Col xs={24} sm={12} md={16} className="text-center sm:text-right">
                    <p>{author}</p>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;   