export default (conf) => {
    if (!conf.uploadUrl || !conf.id || !conf.fn) {
        return false;
    }

    return true;
};
