import getRecommendations from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('Enhanced Recommendation Service Tests', () => {
  describe('Validation Tests', () => {
    test('Retorna array vazio quando produtos não fornecidos', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, null);
      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando produtos é array vazio', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, []);
      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando formData é null', () => {
      const recommendations = getRecommendations(null, mockProducts);
      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando não há preferências nem features selecionadas', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      expect(recommendations).toEqual([]);
    });
  });

  describe('Scoring Algorithm Tests', () => {
    test('Calcula score corretamente para múltiplas preferências', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas'
        ],
        selectedFeatures: ['Gestão de leads e oportunidades'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      
      // RD Station CRM deve ter score 3 (2 preferences + 1 feature)
      const crmProduct = recommendations.find(p => p.name === 'RD Station CRM');
      expect(crmProduct.score).toBe(3);
    });

    test('Features e preferências têm mesmo peso no scoring', () => {
      const formDataPreferences = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const formDataFeatures = {
        selectedPreferences: [],
        selectedFeatures: ['Criação e gestão de campanhas de e-mail'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recsPrefs = getRecommendations(formDataPreferences, mockProducts);
      const recsFeats = getRecommendations(formDataFeatures, mockProducts);

      // Ambos devem retornar RD Station Marketing com score 1
      expect(recsPrefs[0].score).toBe(1);
      expect(recsFeats[0].score).toBe(1);
      expect(recsPrefs[0].name).toBe('RD Station Marketing');
      expect(recsFeats[0].name).toBe('RD Station Marketing');
    });
  });

  describe('SingleProduct Mode Tests', () => {
    test('Sempre retorna array com exatamente 1 elemento', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing', 'Integração fácil com ferramentas de e-mail'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      expect(recommendations).toHaveLength(1);
    });

    test('Em caso de empate múltiplo, retorna o último produto', () => {
      // Criar cenário onde múltiplos produtos têm mesmo score
      const testProducts = [
        {
          id: 1,
          name: 'Produto A',
          preferences: ['test'],
          features: []
        },
        {
          id: 2,
          name: 'Produto B',
          preferences: ['test'],
          features: []
        },
        {
          id: 3,
          name: 'Produto C',
          preferences: ['test'],
          features: []
        }
      ];

      const formData = {
        selectedPreferences: ['test'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, testProducts);
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('Produto C'); // último produto
    });

    test('Retorna array vazio quando nenhum produto tem match', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      expect(recommendations).toEqual([]);
    });
  });

  describe('MultipleProducts Mode Tests', () => {
    test('Retorna produtos ordenados por score decrescente', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail', // CRM
          'Automação de marketing', // Marketing
          'Integração com chatbots' // Conversas
        ],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      
      // Verificar ordem decrescente de scores
      for (let i = 0; i < recommendations.length - 1; i++) {
        expect(recommendations[i].score).toBeGreaterThanOrEqual(recommendations[i + 1].score);
      }
    });

    test('Não retorna produtos com score 0', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'], // Apenas Marketing
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      
      // Deve retornar apenas RD Station Marketing
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
      expect(recommendations[0].score).toBe(1);
    });

    test('Mantém propriedades originais dos produtos', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      const recommendation = recommendations[0];
      
      // Verificar se mantém propriedades originais
      expect(recommendation).toHaveProperty('id');
      expect(recommendation).toHaveProperty('name');
      expect(recommendation).toHaveProperty('category');
      expect(recommendation).toHaveProperty('preferences');
      expect(recommendation).toHaveProperty('features');
      expect(recommendation).toHaveProperty('score'); // Nova propriedade
    });
  });

  describe('Edge Cases', () => {
    test('Funciona com preferências duplicadas na seleção', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing', 'Automação de marketing'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      
      // Duplicatas não devem afetar o score
      expect(recommendations[0].score).toBe(1);
    });

    test('Funciona com strings vazias nas seleções', () => {
      const formData = {
        selectedPreferences: ['', 'Automação de marketing'],
        selectedFeatures: [''],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].score).toBe(1);
    });

    test('Usa valor padrão para selectedRecommendationType quando não fornecido', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: [],
        // selectedRecommendationType não fornecido
      };

      const recommendations = getRecommendations(formData, mockProducts);
      
      // Deve usar 'MultipleProducts' como padrão
      expect(recommendations).toHaveLength(1);
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });

  describe('Performance Tests', () => {
    test('Mantém performance com muitos produtos', () => {
      // Criar muitos produtos de teste
      const manyProducts = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Produto ${i}`,
        category: 'Test',
        preferences: [`pref${i % 10}`],
        features: [`feature${i % 5}`]
      }));

      const formData = {
        selectedPreferences: ['pref1', 'pref2'],
        selectedFeatures: ['feature1'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const startTime = performance.now();
      const recommendations = getRecommendations(formData, manyProducts);
      const endTime = performance.now();

      // Deve executar em menos de 10ms mesmo com 100 produtos
      expect(endTime - startTime).toBeLessThan(10);
      expect(recommendations.length).toBeGreaterThan(0);
    });
  });
});

