import React  from 'react';
import CategioriaService from '../services/CategioriaService';
import Cabecera from '../components/ui/Cabecera';
import CategoriaForm from '../components/ui/CategoriaForm';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const Categoria = () => {
    const categoriaService = new CategioriaService();
    const [categorias, setCategorias] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [categoriaId, setcategoriaId] = React.useState(null);
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
            title: 'Descripcion',
            dataIndex: 'descripcion',
            width: '45%',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            width: '20%',
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            fixed: widthpanel? 'right' : 'none',
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
        const fetchCategorias = async () => {
            const data = await categoriaService.getAll();
            const addNum = asignarNumeros(data.data);
            setCategorias(addNum);
        };

        fetchCategorias();
    }, []);
    const handleOk = async () => {
        try {
            let values = await form.validateFields();
            values = {
                ...values,
                precio: parseFloat(values.precio),
            };
            let res;
            if (categoriaId === null) {
                res = await categoriaService.create(values);
                const nuevasCategorias = [...categorias, res.data];
                setCategorias(asignarNumeros(nuevasCategorias));
                toast.success('Categoría ha sido creada');
            } else {
                res = await categoriaService.update(categoriaId, values); 
                const updatedCategorias = categorias.map(data => {
                    if (data.id === categoriaId) {
                        return { ...data, ...res.data };
                    }
                    return data;
                });
                setCategorias(asignarNumeros(updatedCategorias));
                toast.success('Categoría ha sido actualizada');
            }
            setIsModalVisible(false);
            setcategoriaId(null);
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
        setcategoriaId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        const dataEdit = categorias.find(data => data.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                descripcion: dataEdit.descripcion,
                precio: dataEdit.precio,
            });
            setcategoriaId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await categoriaService.delete(id);
            setCategorias(categorias => asignarNumeros(categorias.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return ( 
        <>
            <Cabecera titulo="Lista de categorías">  
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>  
            </Cabecera> 
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={categorias} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de categoria" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={416}>
                <CategoriaForm form={form}  /> 
            </Modal>
        </>
    );
}

export default Categoria;