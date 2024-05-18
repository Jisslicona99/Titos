import React from 'react';
import TipoService from '../services/TipoService';
import Cabecera from '../components/ui/Cabecera';
import TipoForm from '../components/ui/TipoFrom';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const TipoDonante = () => {
    const [tipoDonantes, settipoDonantes] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [tipoDonateId, settipoDonateId] = React.useState(null);
    const [form] = Form.useForm();
    const tipoService = new TipoService();
    const columnas = [
        {
            title: 'N°',
            dataIndex: 'numero',
            fixed: window.innerWidth > 768 ? 'left' : undefined,
            width: '5%',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            width: '45%',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            width: '20%',
            render: (text, record) => (
                record.estado === 1
                    ? <span className="inline-block bg-green-200 text-green-800 px-2 py-1 text-xs font-bold rounded">Activo</span>
                    : <span className="inline-block bg-red-200 text-red-800 px-2 py-1 text-xs font-bold rounded">Inactivo</span>
            ),
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            fixed: window.innerWidth > 768 ? 'right' : undefined,
            width: '30%',
            render: (text, record) => (
                <div className='flex gap-1'>
                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded" onClick={() => handleEdit(record.id)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded" onClick={() => handleDelete(record.id)}>Eliminar</Button>
                </div>
            ),
        },
    ];
    const asignarNumeros = (tipoDonantes) => {
        return tipoDonantes.map((categoria, index) => ({
            ...categoria,
            numero: index + 1,
        }));
    };

    React.useEffect(() => {
        const fetchtipoDonantes = async () => {
            const data = await tipoService.getAll();
            const addNum = asignarNumeros(data.data);
            settipoDonantes(addNum);
        };

        fetchtipoDonantes();
    }, []);
    const handleOk = async () => {
        try {
            let values = await form.validateFields();
            values = {
                ...values,
                estado: parseInt(values.estado),
            };
            let data; 
            if (tipoDonateId === null) {
                data = await tipoService.create(values);
                const nuevastipoDonantes = [...tipoDonantes, data.data];
                settipoDonantes(asignarNumeros(nuevastipoDonantes));
                toast.success('tipo donate ha sido creada');
            } else {
                data = await tipoService.update(tipoDonateId, values);
                const updatedtipoDonantes = tipoDonantes.map(categoria => {
                    if (categoria.id === tipoDonateId) {
                        return { ...categoria, ...data.data };
                    }
                    return categoria;
                });
                settipoDonantes(asignarNumeros(updatedtipoDonantes));
                toast.success('tipo donate ha sido actualizada');
            }
            setIsModalVisible(false);
            settipoDonateId(null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log('Validation Errors:', error.errors);
            } else {
                console.log('Error:', error);
            }
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleNuevo = () => {
        form.resetFields();
        settipoDonateId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        const dataEdit = tipoDonantes.find(categoria => categoria.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                nombre: dataEdit.nombre,
                estado: dataEdit.estado,
            });
            settipoDonateId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await tipoService.delete(id);
            settipoDonantes(tipoDonantes => asignarNumeros(tipoDonantes.filter(categoria => categoria.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Tipo donantes">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera> 
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={tipoDonantes} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de tipo donante" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={416}>
                <TipoForm form={form} /> 
            </Modal>
        </>
    );
}

export default TipoDonante;