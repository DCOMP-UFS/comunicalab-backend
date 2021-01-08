const Antl = use('Antl');

class SoftwareOsImage {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      is_deleted: 'boolean',
      software_id: 'exists:softwares,id',
      os_image_id: 'exists:os_images,id',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = SoftwareOsImage;
