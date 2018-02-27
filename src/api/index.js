import AV from 'leancloud-storage'

const appId =  'tC3ymTkKL94hi3hk7UBP5DW3-gzGzoHsz';
const appKey = 'ABFSjS76gUWYD7egXvsFIinF';

AV.init({appId, appKey})

export default { SDK: AV }