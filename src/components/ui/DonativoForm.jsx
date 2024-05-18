import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
const { TextArea } = Input;

const DonativoForm = ({ form, listCategorias, listColecciones, listDonadores }) => {
    return (
        <Form form={form} layout="vertical" name="myform">
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="id_categoria"
                        label="Seleccione categoria"
                        rules={[{ required: true, message: 'seleccione una categoria!' }]}
                    >
                        <Select showSearch filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {listCategorias.map((data) => (
                                <Select.Option key={data.id} value={data.id}>
                                    {data.descripcion}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="id_donador"
                        label="Seleccione donador"
                        rules={[{ required: true, message: 'seleccione un tipo donador!' }]}
                    >
                        <Select showSearch filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {listDonadores.map((data) => (
                                <Select.Option key={data.id} value={data.id}>
                                    {data.nombre + " " + data.apellidos}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="id_coleccion"
                        label="Seleccione colección"
                        rules={[{ required: true, message: 'seleccione un colección!' }]}
                    >
                        <Select showSearch filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {listColecciones.map((data) => (
                                <Select.Option key={data.id} value={data.id}>
                                    {data.nombre}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingrese el descripción!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="cantidad"
                        label="Cantidad"
                        rules={[
                            { required: true, message: 'Por favor ingrese la cantidad!' },
                            { pattern: /^[0-9]+$/, message: 'Solo se permiten números!' }
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="logistica"
                        label="Logística"
                        rules={[{ required: true, message: 'Por favor ingrese la descripción de la logística!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="hora"
                        label="Hora"
                        rules={[
                            { required: true, message: 'Por favor ingrese la hora!' },
                            { pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message: 'Por favor ingrese una hora válida (HH:MM)!' }
                        ]}
                    >
                        <Input type="time" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Form.Item
                        name="fecha"
                        label="Fecha"
                        rules={[
                            { required: true, message: 'Por favor ingrese la fecha!' },
                            { pattern: /^\d{4}-\d{2}-\d{2}$/, message: 'Por favor ingrese una fecha válida (YYYY-MM-DD)!' }
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                </Col> 
                {/* AQUI QUIER QUE VAYA PARA AGREGRAR ITEMS DE ESTADO */}
            </Row>
            
        </Form>
    );
};

export default DonativoForm;