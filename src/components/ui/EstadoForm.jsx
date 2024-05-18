import React from 'react';
import { Button, Form, Input, Upload, Select } from 'antd';
import { HiPlusCircle } from 'react-icons/hi';

const EstadoForm = ({ form }) => {
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Form form={form} layout="vertical" name="myform" >
            <Form.Item
                name="imagen"
                label="imagen"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: false, message: 'Por favor seleccione una imagen!' }]}
            >
                <Upload
                    name="imagen"
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={({ fileList }) => {
                        const lastFile = fileList.slice(-1);
                        form.setFieldsValue({ imagen: lastFile });
                    }}
                >
                    <Button icon={<HiPlusCircle />}>Seleccionar imagen</Button>
                </Upload>
            </Form.Item> 
            <Form.Item
                name="tipo"
                label="tipo"
                rules={[{ required: true, message: 'Por favor ingrese el tipo!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="descripcion"
                label="Descripción"
                rules={[{ required: true, message: 'Por favor ingrese el descripción!' }]}
            >
                <Input />
            </Form.Item> 
        </Form>
    );
}

export default EstadoForm;