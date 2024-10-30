const iconEl = wp.element.createElement('svg', { width: 100, height: 100 },
  wp.element.createElement('path', { d: "M7.01154034,13.0722738 L2.63779951,10.6836186 L2.63779951,9.3599022 L7.01154034,6.9809291 L7.01154034,8.5393643 L3.9606846,10.00489 L7.01154034,11.5255257 L7.01154034,13.0722738 Z M7.45232274,14.1213203 L9.03823961,5.83031785 L9.96127139,5.83031785 L8.35755501,14.1212714 L7.45232274,14.1213203 Z M10.3342298,13.1061125 L10.3342298,11.5568215 L13.4093399,10.0466015 L10.3342298,8.55242054 L10.3342298,7.01466993 L14.7419071,9.39550122 L14.7419071,10.7092421 L10.3342298,13.1061125 Z" }),
  wp.element.createElement('path', { d: "M8.68958435,19.9758435 L0.0270904645,14.9846455 L0.0270904645,5.00107579 L8.68958435,0.00968215159 L17.3526161,5.00136919 L17.3526161,14.9838631 L8.68958435,19.9758435 Z M0.90591687,14.4778484 L8.68958435,18.962934 L16.4737897,14.4778484 L16.4737897,5.50767726 L8.68958435,1.02224939 L0.90591687,5.50733496 L0.90591687,14.4777995 L0.90591687,14.4778484 Z" })
);

wp.blocks.registerBlockType('cn/verify', {
  title: 'CodeNotary Verify',
  icon: iconEl,
  category: 'common',
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: '.cnv'
    }
  },
  edit: function ({ className, attributes, setAttributes }) {
    const { content } = attributes;

    function onChangeContent(newContent) {
      setAttributes({ content: newContent });
    }

    return wp.element.createElement(wp.editor.RichText, {
      tagName: 'p',
      className: className,
      value: content,
      onChange: onChangeContent
    });

  },
  save: function ({ attributes, className }) {
    const { content } = attributes;

    return wp.element.createElement(wp.editor.RichText.Content, {
      tagName: 'p', value: content, className: "cnv"
    });

  },
})

