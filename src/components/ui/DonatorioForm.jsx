import React from 'react';
import { Form, Input, Select } from 'antd';

const DonatorioForm = ({ form, listColeccion }) => {
    return (
        <Form form={form} layout="vertical" name="myform">
            <Form.Item
                name="id_coleccion"
                label="Seleccione colección"
                rules={[{ required: true, message: 'seleccione un colección!' }]}
            >
                <Select showSearch filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    {listColeccion.map((data) => (
                        <Select.Option key={data.id} value={data.id}>
                            {data.nombre}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item> 
            <Form.Item
                name="nombre"
                label="Nombres"
                rules={[{ required: true, message: 'Por favor ingrese el nombre!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="tipo"
                label="Tipo"
                rules={[{ required: true, message: 'Por favor ingrese un tipo!' }]}
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
            <Form.Item
                name="direccion"
                label="Dirección"
                rules={[{ required: true, message: 'Por favor ingrese la dirección!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default DonatorioForm;