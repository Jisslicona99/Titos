import React from 'react';
import GrupoService from '../services/GrupoService';
import Cabecera from '../components/ui/Cabecera';
import GrupoForm from '../components/ui/GrupoForm';
import { HiPlusCircle } from 'react-icons/hi';
import {Table, Button, Modal, Form} from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const Grupo = () => {
    const [Grupos, setGrupos] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [grupoId, setgrupoId] = React.useState(null);
    const [form] = Form.useForm();
    const Gruposervice = new GrupoService();
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
    const asignarNumeros = (Grupos) => {
        return Grupos.map((grupo, index) => ({
            ...grupo,
            numero: index + 1,
        }));
    };

    React.useEffect(() => {
        const fetchGrupos = async () => {
            const data = await Gruposervice.getAll();
            const addNum = asignarNumeros(data.data);
            setGrupos(addNum);
        };

        fetchGrupos();
    }, []);
    const handleOk = async () => {
        try {
            let values = await form.validateFields();
            values = {
                ...values,
                precio: parseFloat(values.precio),
            };
            let data;
            if (grupoId === null) {
                data = await Gruposervice.create(values);
                const nuevasGrupos = [...Grupos, data.data];
                setGrupos(asignarNumeros(nuevasGrupos));
                toast.success('Grupo ha sido creada');
            } else {
                data = await Gruposervice.update(grupoId, values);
                const updatedGrupos = Grupos.map(grupo => {
                    if (grupo.id === grupoId) {
                        return { ...grupo, ...data.data };
                    }
                    return grupo;
                });
                setGrupos(asignarNumeros(updatedGrupos));
                toast.success('Grupo ha sido actualizada');
            }
            setIsModalVisible(false);
            setgrupoId(null);
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
        setgrupoId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        const dataEdit = Grupos.find(grupo => grupo.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                nombre: dataEdit.nombre,
                descripcion: dataEdit.descripcion,
            });
            setgrupoId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await Gruposervice.delete(id);
            setGrupos(Grupos => asignarNumeros(Grupos.filter(grupo => grupo.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Lista de grupos">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera> 
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={Grupos} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de grupo" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={416}>
                <GrupoForm form={form} /> 
            </Modal>
        </>
    );
}

export default Grupo;