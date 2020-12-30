import axios from '@/plugins/axios'
import alert from '@/plugins/alert'

const CATEGORY_API = '/categories/'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  actions: {
    fetchCategories({ commit, state }) {
      if (state.categories.length) return
      return axios
        .get(CATEGORY_API)
        .then(cats => {
          commit('setCategories', cats)
        })
        .catch(e => alert.error(e))
    },
    createCategory({ commit }, cat) {
      return axios
        .post(CATEGORY_API, cat)
        .then(newCat => {
          commit('receiveCategory', newCat)
          alert.success('New category added: ' + newCat.title)
          return newCat
        })
        .catch(e => alert.error(e))
    },
    updateCategory({ commit }, { id, ...cat }) {
      return axios
        .put(CATEGORY_API + id, cat)
        .then(updatedCat => {
          commit('receiveCategory', updatedCat)
          alert.success('Category ' + updatedCat.title + ' updated!')
          return updatedCat
        })
        .catch(e => alert.error(e))
    },
    removeCategory({ commit }, catId) {
      return axios
        .delete(CATEGORY_API + catId)
        .then(delCat => {
          commit('removeCategory', delCat.id)
          alert.success('Category ' + delCat.title + ' deleted!')
        })
        .catch(e => alert.error(e))
    }
  },
  mutations: {
    setCategories(state, cats = []) {
      state.categories = cats
    },
    receiveCategory(state, cat) {
      const i = state.categories.findIndex(c => c.id === cat.id)
      if (i > -1) {
        state.categories.splice(i, 1, cat)
      } else {
        state.categories.push(cat)
      }
    },
    removeCategory(state, id) {
      const i = state.categories.findIndex(c => c.id === id)
      if (i > -1) state.categories.splice(i, 1)
    }
  },
  getters: {
    categoriesTree: state => _makeCategoriesTree(state.categories)
  }
}

function _makeCategoriesTree(categories = []) {
  const roots = []
  const descendants = []
  for (let i = categories.length - 1; i > -1; i--) {
    const cat = categories[i]
    Array.prototype.unshift.call(!cat.parentId ? roots : descendants, cat)
  }
  return roots.map(root => ({
    ...root,
    children: _findCategoryChildren(descendants, root.id)
  }))
}

function _findCategoryChildren(categories, categoryId) {
  const children = []
  for (let i = categories.length - 1; i >= 0; i--) {
    if (categories[i].parentId === categoryId) {
      children.push(...categories.splice(i, 1))
    }
  }
  return children.map(category => ({
    ...category,
    slug: `/category/${category.id}`,
    children: _findCategoryChildren(categories, category.id)
  }))
}

// function _makeCategoriesById (categories = []) {
//   const categoriesById = {}
//   _appendCategories(categoriesById, categories)
//   return categoriesById
// }

// function _appendCategories (categoriesById = {}, categories = []) {
//   categories.forEach(category => {
//     categoriesById[category.id] = category
//     _appendCategories(categoriesById, category.children)
//   })
// }
