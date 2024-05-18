import React from 'react';
import { Form, Input, Select } from 'antd';

const DonadorForm = ({ form, listGrupo, listTipo }) => {
    return (
        <Form form={form} layout="vertical" name="myform">
            <Form.Item
                name="id_grupo"
                label="Seleccione grupo"
                rules={[{ required: true, message: 'seleccione un grupo!' }]}
            >
                <Select showSearch filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    {listGrupo.map((role) => (
                        <Select.Option key={role.id} value={role.id}>
                            {role.nombre}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="id_tipo_donante"
                label="Seleccione tipo donante"
                rules={[{ required: true, message: 'seleccione un tipo donante!' }]}
            >
                <Select showSearch filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    {listTipo.map((role) => (
                        <Select.Option key={role.id} value={role.id}>
                            {role.nombre}
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
                name="apellidos"
                label="Apellidos"
                rules={[{ required: true, message: 'Por favor ingrese los apellidos!' }]}
            >
                <Input />
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

export default DonadorForm;