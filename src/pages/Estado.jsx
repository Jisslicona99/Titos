import React from 'react';
import EstadoService from '../services/EstadoService';
import Cabecera from '../components/ui/Cabecera';
import EstadoForm from '../components/ui/EstadoForm';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'
import { useParams } from 'react-router-dom';

const Estado = () => {
    const { id_donativo } = useParams();
    const estadoService = new EstadoService();
    const [estados, setEstado] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [estadoId, setEstadoId] = React.useState(null);
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
            title: 'Imagen',
            dataIndex: 'imagen',
            width: '45%',
            render: (text, record) => (
                <img
                    className="h-8 w-8 rounded-full"
                    src={record.imagen}
                    alt="Imagen"
                />
            ),
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            width: '20%',
        },
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
            width: '45%',
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
        const fetchestados = async () => {
            const data = await estadoService.getAll(id_donativo);
            const addNum = asignarNumeros(data.data);
            setEstado(addNum);
        };

        fetchestados();
    }, []);
    const handleOk = async () => {
        try {
            let values = await form.validateFields();
            values = {
                ...values,
                id_donativo: id_donativo,
            };
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'imagen') {
                    if (Array.isArray(value) && value.length > 0) {
                        formData.append('imagen', value[0].originFileObj);
                    }
                } else {
                    formData.append(key, value);
                }
            });
            console.log(values);
            let res;
            if (estadoId === null) {
                res = await estadoService.create(formData);
                console.log(res);
                const nuevasestados = [...estados, res.data];
                setEstado(asignarNumeros(nuevasestados));
                toast.success('Estado ha sido creada');
            } else {
                res = await estadoService.update(estadoId, formData);
                const updatedestados = estados.map(data => {
                    if (data.id === estadoId) {
                        return { ...data, ...res.data };
                    }
                    return data;
                });
                setEstado(asignarNumeros(updatedestados));
                toast.success('Estado ha sido actualizada');
            }
            setIsModalVisible(false);
            setEstadoId(null);
        } catch (error) {
            console.log(error);
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
        setEstadoId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        const dataEdit = estados.find(data => data.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                descripcion: dataEdit.descripcion,
                tipo: dataEdit.tipo,
            });
            setEstadoId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await estadoService.delete(id);
            setEstado(estados => asignarNumeros(estados.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Lista de estados">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera>
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={estados} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de Esatdo" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={416}>
                <EstadoForm form={form} />
            </Modal>
        </>
    );
}

export default Estado;