import React from 'react';
import { Row, Col } from 'antd'; 

const Cabecera = ({ titulo, children }) => {
    return (
        <Row className="flex items-center justify-between  bg-white mb-2 shadow-md p-2">
            <Col xs={24} sm={12} md={8}>
                <h2 className="mb-0 text-uppercase text-base font-bold">{titulo}</h2>  
            </Col>
            <Col xs={24} sm={12} md={16} className="">
                <ol className="flex flex-wrap items-center gap-2 m-0 md:float-end sm:float-start">
                    {children}
                </ol>
            </Col>
        </Row>
    );
};

export default Cabecera;