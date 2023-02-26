/**
 * @typedef {import('eslint')} Identifier
 * @typedef {import('estree').Literal} Literal
 * @typedef {import('estree').UnaryExpression} UnaryExpression
 */

/* eslint-disable */
module.exports = {
	meta: {
		docs: {
			description: 'Allows to check [test_case_id] in describe/test/it',
			category: 'Best Practices',
			recommended: true,
		},
	},

	create: function (context) {
		const pattern = /^(?:(?!\[\d+\]).)*$/s;
		return {
			CallExpression: function (node) {
				if (node.callee.name === 'it' || node.callee.name === 'test') {
					/* Searches for parent "Describe" which has nested "it/test" functions and match title with given regex pattern */
					const isParentDescribeHasId = Boolean(node.parent?.parent?.parent?.parent?.arguments[0]?.quasis)
						? node.parent.parent.parent.parent.arguments[0].quasis[0].value.raw.match(pattern)
						: Boolean(node.parent?.parent?.parent?.parent?.arguments[0]?.right)
						? node.parent?.parent?.parent?.parent?.arguments[0]?.right.value.match(pattern)
						: node.parent?.parent?.parent?.parent?.arguments[0].value.match(pattern);

					/* Matche "it/test" title with given regex pattern */
					const hasId = Boolean(node.arguments[0]?.quasis)
						? node.arguments[0].quasis[0].value.raw.match(pattern)
						: Boolean(node.arguments[0]?.right)
						? node.arguments[0]?.right.value.match(pattern)
						: node.arguments[0].value.match(pattern);

					// node.arguments[0].value.match(pattern)
					if (isParentDescribeHasId && hasId) {
						context.report({
							node: node,
							message: 'Missing [test_case_id] in the Title',
						});
					}
				}
			},
		};
	},
};
