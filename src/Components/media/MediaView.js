import React, { useEffect, useState } from 'react';
import { createMedia, getMedias, updateMedia, deleteMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [formValues, setFormValues] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', imagen: '',
    anioEstreno: '', genero: '', director: '', productora: '', tipo: ''
  });
  const [selectedSerial, setSelectedSerial] = useState(null);

  const listarMedias = async () => {
    const resp = await getMedias();
    setMedias(resp.data);
  };

  useEffect(() => {
    listarMedias();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSerial) {
      await updateMedia(selectedSerial, formValues);
    } else {
      await createMedia(formValues);
    }
    setFormValues({ serial: '', titulo: '', sinopsis: '', url: '', imagen: '', anioEstreno: '', genero: '', director: '', productora: '', tipo: '' });
    setSelectedSerial(null);
    listarMedias();
  };

  const handleUpdate = (media) => {
    setFormValues({ ...media, genero: media.genero._id, director: media.director._id, productora: media.productora._id, tipo: media.tipo._id });
    setSelectedSerial(media.serial);
  };

  const handleDelete = async (serial) => {
    await deleteMedia(serial);
    listarMedias();
  };

  return (
    <div className="container">
      <h3>Películas / Series</h3>
      <form onSubmit={handleSubmit}>
        <input name="serial" value={formValues.serial} onChange={handleChange} placeholder="Serial" className="form-control mb-2" required />
        <input name="titulo" value={formValues.titulo} onChange={handleChange} placeholder="Título" className="form-control mb-2" required />
        <input name="sinopsis" value={formValues.sinopsis} onChange={handleChange} placeholder="Sinopsis" className="form-control mb-2" required />
        <input name="url" value={formValues.url} onChange={handleChange} placeholder="URL" className="form-control mb-2" required />
        <input name="imagen" value={formValues.imagen} onChange={handleChange} placeholder="Imagen" className="form-control mb-2" />
        <input name="anioEstreno" type="number" value={formValues.anioEstreno} onChange={handleChange} placeholder="Año de estreno" className="form-control mb-2" required />
        <input name="genero" value={formValues.genero} onChange={handleChange} placeholder="ID Género" className="form-control mb-2" required />
        <input name="director" value={formValues.director} onChange={handleChange} placeholder="ID Director" className="form-control mb-2" required />
        <input name="productora" value={formValues.productora} onChange={handleChange} placeholder="ID Productora" className="form-control mb-2" required />
        <input name="tipo" value={formValues.tipo} onChange={handleChange} placeholder="ID Tipo" className="form-control mb-2" required />
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>

      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Sinopsis</th>
            <th>Año</th>
            <th>Creación</th>
            <th>Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((m) => (
            <tr key={m._id}>
              <td>{m.titulo}</td>
              <td>{m.sinopsis}</td>
              <td>{m.anioEstreno}</td>
              <td>{moment(m.fechaCreacion).format('DD-MM-YYYY')}</td>
              <td>{moment(m.fechaActualizacion).format('DD-MM-YYYY')}</td>
              <td>
                <button onClick={() => handleUpdate(m)} className="btn btn-warning btn-sm me-2">Editar</button>
                <button onClick={() => handleDelete(m.serial)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};