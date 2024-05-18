import React from 'react';
import { Button, Form, Input, Upload, Select } from 'antd';
import { HiPlusCircle } from 'react-icons/hi';

const UserForm = ({ form, rolesList, usuarioId }) => {
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Form form={form} layout="vertical" name="myform" >
            <Form.Item
                name="avatar"
                label="Avatar"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: false, message: 'Por favor seleccione una imagen!' }]}
            >
                <Upload
                    name="avatar"
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={({ fileList }) => {
                        const lastFile = fileList.slice(-1);
                        form.setFieldsValue({ avatar: lastFile });
                    }}
                >
                    <Button icon={<HiPlusCircle />}>Seleccionar imagen</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                name="id_rol"
                label="Rol de usuario"
                rules={[{ required: true, message: 'Por favor ingrese el ID del Rol!' }]}
            >
                <Select>
                    {rolesList.map(role => (
                        <Select.Option key={role.id} value={role.id}>
                            {role.nombre}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingrese el nombre!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Por favor ingrese el email!' }]}
            >
                <Input />
            </Form.Item>
            {usuarioId === null && (
                <>
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'Por favor ingrese la contraseña!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        label="Confirmar Contraseña"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Por favor confirme la contraseña!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Las contraseñas no coinciden!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </>
            )}
        </Form>
    );
}

export default UserForm;