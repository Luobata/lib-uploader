import rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';
import css from 'rollup-plugin-css-only';
import vue from 'rollup-plugin-vue';
import image from 'rollup-plugin-img';
import url from 'rollup-plugin-url';
import flow from 'rollup-plugin-flow';

const root = path.resolve(__dirname, './');

module.exports = {
    input: 'src/index.js',
    name: 'libUpload',
    sourcemap: true,
    output: {
        file: 'dist/upload.js',
        format: 'umd'
    },
    plugins: [
        // uglify(),
        resolve(),
        commonjs(),
        vue({
            css: true
            //css: 'dist/header.css'
        }),
        url(),
        flow(
            {
                all: true
            }
        ),
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ 'es2015', { "modules": false } ]
            ],
        }),
        alias({
            UI: path.resolve(__dirname, '../src/ui'),
            EVENT: path.resolve(__dirname, '../src/event')
        })
    ]
// output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
};
