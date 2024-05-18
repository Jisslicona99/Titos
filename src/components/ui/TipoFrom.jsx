import React from 'react';
import { Form, Input, Select } from 'antd';

const Tipoform = ({ form }) => {
    return (
        <Form form={form} layout="vertical" name="tipoForm">
            <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="estado"
                label="Estado"
                rules={[{ required: true, message: 'Selecione un estado!' }]}
            >
                <Select>
                    <Select.Option value={1}>Activo</Select.Option>
                    <Select.Option value={0}>Inactivo</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
}

export default Tipoform;

