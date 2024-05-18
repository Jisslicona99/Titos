import React from 'react';
import ColeccionService from '../services/ColeccionService';
import Cabecera from '../components/ui/Cabecera';
import ColeccionForm from '../components/ui/ColeccionForm';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const Coleccion = () => {
    const coleccionService = new ColeccionService();
    const [colecciones, setColeccion] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [coleccionId, setColeccionId] = React.useState(null);
    const [form] = Form.useForm();

    const [widthpanel, setWidthpanel] = React.useState(false);

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWidthpanel(window.innerWidth > 800);
        };

        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const columnas = [
        {
            title: 'N°',
            dataIndex: 'numero',
            fixed: widthpanel ? 'left' : 'none',
            width: '5%',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            width: '25%',
        },
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            width: '20%',
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            width: '20%',
        },
        {
            title: 'Contacto',
            dataIndex: 'contacto',
            width: '20%',
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            fixed: widthpanel ? 'right' : 'none',
            width: '30%',
            render: (text, record) => (
                <div className='flex gap-1'>
                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded" onClick={() => handleEdit(record.id)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded" onClick={() => handleDelete(record.id)}>Eliminar</Button>
                </div>
            ),
        },
    ];
    const asignarNumeros = (obj) => {
        return obj.map((data, index) => ({
            ...data,
            numero: index + 1,
        }));
    };

    React.useEffect(() => {
        const fetchcolecciones = async () => {
            const data = await coleccionService.getAll();
            const addNum = asignarNumeros(data.data);
            setColeccion(addNum);
        };

        fetchcolecciones();
    }, []);
    const handleOk = async () => {
        try {
            let values = await form.validateFields(); 
            let res;
            if (coleccionId === null) {
                res = await coleccionService.create(values);
                const nuevascolecciones = [...colecciones, res.data];
                setColeccion(asignarNumeros(nuevascolecciones));
                toast.success('Colección ha sido creada');
            } else {
                res = await coleccionService.update(coleccionId, values);
                const updatedcolecciones = colecciones.map(data => {
                    if (data.id === coleccionId) {
                        return { ...data, ...res.data };
                    }
                    return data;
                });
                setColeccion(asignarNumeros(updatedcolecciones));
                toast.success('Colección ha sido actualizada');
            }
            setIsModalVisible(false);
            setColeccionId(null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            } else {
                toast.error(error.message === "Failed to fetch" ? 'El servidor no se encuentra o está apagado' : 'Error del servidor');
            }
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleNuevo = () => {
        form.resetFields();
        setColeccionId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        const dataEdit = colecciones.find(data => data.id === id);
        if (dataEdit) {
            form.setFieldsValue({ 
                nombre: dataEdit.nombre,
                direccion: dataEdit.direccion,
                telefono: dataEdit.telefono,
                contacto: dataEdit.contacto, 
            });
            setColeccionId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await coleccionService.delete(id);
            setColeccion(colecciones => asignarNumeros(colecciones.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Lista de colecciones">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera>
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={colecciones} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de colección" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={616}>
                <ColeccionForm form={form} />
            </Modal>
        </>
    );
}

export default Coleccion;