export default function (config, env, helpers) {
  /** you can change config here **/
  env.ASSETS = "/mywords/assets/";
  if(env.production){
    config.output.publicPath = "/mywords/";
  }
}