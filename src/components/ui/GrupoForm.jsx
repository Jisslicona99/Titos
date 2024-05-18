import React from 'react';
import { Form, Input, InputNumber } from 'antd';

const GrupoForm = ({ form }) => {
    return (
        <Form form={form} layout="vertical" name="grupoForm">
            <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingrese un nombre!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="descripcion"
                label="Descripción"
                rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
            >
                <Input />
            </Form.Item>

        </Form>
    );
}

export default GrupoForm;