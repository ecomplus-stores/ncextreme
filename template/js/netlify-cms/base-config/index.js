import getSections from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections'
import getSettings from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings'
import getLayout from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout'
import getPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages'
import getBlogPosts from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts'
import getExtraPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages'
import getWidgets from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets'

export default options => {
  options.sections = getSections(options).concat[ {
    label: 'Multi Estante de produtos',
    name: 'multi-collection-shelf',
    widget: 'object',
    icon: 'https://api.iconify.design/bi:bag-check.svg',
    fields: [
      {
        label: 'Coleções de produtos',
        required: false,
        name: 'collection_ids',
        hint: 'Se este campo não for preenchido, serão listados os produtos mais populares da loja',
        widget: 'select',
        multiple: true,
        options: [{
          resource: 'collections',
          label: ''
        }, {
          resource: 'categories',
          label: 'Categoria: '
        }, {
          resource: 'brands',
          label: 'Marca: '
        }].reduce((options, shelf) => {
          state.routes.forEach(({ _id, resource, name, path }) => {
            if (resource === shelf.resource) {
              options.push({
                label: shelf.label + name,
                value: `${_id}:${resource}:${name}:${path}`
              })
            }
          })
          return options
        }, [])
      },
      searchOrderField,
      {
        label: 'Embaralhar produtos',
        name: 'shuffle',
        widget: 'boolean',
        default: false
      },
      {
        label: 'Título da estante',
        required: false,
        name: 'title',
        hint: 'Usará o nome da coleção por padrão',
        widget: 'string'
      },
      {
        label: 'Link no título',
        required: false,
        name: 'link',
        hint: 'Usará o slug da coleção por padrão',
        widget: 'string'
      },
      {
        label: 'Sem cabeçalho',
        required: false,
        name: 'headless',
        widget: 'boolean',
        hint: 'Mostrar apenas a lista de produtos, sem título ou link'
      },
      {
        label: 'Limite de itens',
        required: false,
        name: 'limit',
        widget: 'number',
        min: 1,
        max: 12,
        default: 8
      },
      {
        label: 'Paginação',
        required: false,
        name: 'page',
        hint: 'Aumente o número da página para pular os itens iniciais e repetir estantes com a mesma coleção',
        widget: 'number',
        min: 1,
        default: 1
      },
      {
        label: 'Carousel autoplay',
        required: false,
        name: 'autoplay',
        hint: 'Exibição de cada página em milisegundos, 0 desativa o autoplay',
        min: 0,
        step: 1000,
        widget: 'number'
      }
    ]
  }]
  return {
    backend: {
      name: 'git-gateway',
      branch: 'master',
      commit_messages: {
        create: 'Create {{collection}} “{{slug}}”',
        update: 'Update {{collection}} “{{slug}}”',
        delete: 'Delete {{collection}} “{{slug}}”',
        uploadMedia: 'Upload “{{path}}”',
        deleteMedia: '[skip ci] Delete “{{path}}”',
        openAuthoring: '{{message}}'
      }
    },
    logo_url: 'https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png',
    locale: 'pt',
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: '/img/uploads',
    slug: {
      encoding: 'ascii',
      clean_accents: true,
      sanitize_replacement: '-'
    },
    collections: [
      getSettings(options),
      getLayout(options),
      getPages(options),
      getBlogPosts(options),
      getExtraPages(options),
      getWidgets(options)
    ]
  }
}
