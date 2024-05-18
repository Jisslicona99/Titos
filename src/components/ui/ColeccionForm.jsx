import React from 'react';
import { Form, Input } from 'antd';

const ColeccionForm = ({ form }) => {
    return (
        <Form form={form} layout="vertical" name="categoriaForm">
            <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="direccion"
                label="dirección"
                rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="contacto"
                label="Contacto"
                rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
            >
                <Input />
            </Form.Item> 
            <Form.Item
                name="telefono"
                label="Telefeono"
                rules={[{ required: true, message: 'Por favor ingrese su teléfono!' }]}
            >
                 
                <Input type='tel' />
            </Form.Item>
        </Form>
    );
}

export default ColeccionForm;