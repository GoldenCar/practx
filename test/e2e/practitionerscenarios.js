'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('practitioner controller', function () {


    describe('The ability for a practitioner to view all exercises', function () {
        beforeEach(function () {
            browser().navigateTo('/');
        });

        it('should render exercise screen', function () {
            expect(element('#exercises').text()).
                toMatch("Exercises");
        });

        it('should display a list of exercises', function () {
            sleep(1)
            expect(repeater('.exercises', "Exercises").count()).toBeGreaterThan(0)
        })

        it('should display practitioner data for patient', function () {
            sleep(1)
            expect(binding('practitioner.clinic.name + ' - ' + practitioner.clinic.phone')).toMatch('Thomas Bunting')
        })

        it('should filter list of exercises', function () {
            sleep(1)
            var before = repeater('.exercises', "Exercises").count()
            element('#strengthenbtn', "Strength Button").click()

            expect(repeater('.exercises', "Exercises").count()).toBe(27)
        })
    });
});
