function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
      if (source[key]) {
          target[map[key]] = source[key];
      }
  });
}
function profileComponent(vantOptions) {
  var options = {};
  mapKeys(vantOptions, options, {
      data: 'data',
      props: 'properties',
      mixins: 'behaviors',
      methods: 'methods',
      beforeCreate: 'created',
      created: 'attached',
      mounted: 'ready',
      destroyed: 'detached',
      classes: 'externalClasses',
  });

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');
  // add default behaviors
  options.behaviors = options.behaviors || [];
//   options.behaviors.push(basic_1.basic);
  // add relations
  var relation = vantOptions.relation;
  if (relation) {
      options.relations = relation.relations;
      options.behaviors.push(relation.mixin);
  }
  // map field to form-field behavior
  if (vantOptions.field) {
      options.behaviors.push('wx://form-field');
  }
  // add default options
  options.options = {
      multipleSlots: true,
      addGlobalClass: true,
  };

  Component(options);
}

export {profileComponent}