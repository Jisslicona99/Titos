import React from 'react';
import { Form, Input, InputNumber  } from 'antd'; 

const CategoriaForm = ({ form }) => { 
    return (
        <Form form={form} layout="vertical" name="categoriaForm">
            <Form.Item
                name="descripcion"
                label="Descripción"
                rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="precio"
                label="Precio"
                rules={[{ required: true, message: 'Por favor ingrese el precio!' }]}
            >
                <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            </Form.Item>
        </Form>
    );
}

export default CategoriaForm;