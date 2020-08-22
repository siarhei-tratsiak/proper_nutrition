<template>
  <div class="align-start d-flex flex-lg-nowrap flex-wrap justify-center">
    <UserData />
    <DailyIntake />
  </div>
</template>

<script>
import UserData from '@/components/settings/userData/UserData'
import DailyIntake from '@/components/settings/dailyIntake/DailyIntake'

export default {
  components: {
    UserData,
    DailyIntake
  }
}
</script>
