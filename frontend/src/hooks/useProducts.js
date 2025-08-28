import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular loading mínimo para mostrar spinner (removível em produção)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const productsData = await getProducts();
        setProducts(productsData);

        const prefSet = new Set();
        const featSet = new Set();

        productsData.forEach(({ preferences, features }) => {
          preferences.forEach(prefSet.add, prefSet);
          features.forEach(featSet.add, featSet);
        });

        setPreferences([...prefSet]);
        setFeatures([...featSet]);
      } catch (err) {
        console.error('Erro ao obter os produtos:', err);
        setError('Erro ao carregar produtos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { preferences, features, products, loading, error };
};

export default useProducts;
