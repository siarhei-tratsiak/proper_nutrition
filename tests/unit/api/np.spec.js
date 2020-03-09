import chai from 'chai';
import {
  shape,
  less,
} from '@/api/np';

describe('api', function() {
  describe('np.js', function() {
    describe('shape(arr)', function() {
      it('should return array of arr dimensions', function() {
        const arr = [[1, 2, 3], [4, 5, 6]];
        chai.assert.sameOrderedMembers(shape(arr), [2, 3]);
      });

      it('should return empty array for non-array value', function() {
        const arr = 'hello';
        chai.assert.sameOrderedMembers(shape(arr), []);
      });

      it('should return [0] for empty array', function() {
        const arr = [];
        chai.assert.sameOrderedMembers(shape(arr), [0]);
      });
    });

    describe('less(array, value)', function() {
      it('should return array of boolean', function() {
        const array = [1, 2, 3];
        const value = 2;
        chai.assert.sameOrderedMembers(less(array, value), [true, false, false]);
      });
    });
  });
});
