<script setup>
import FeedIcon from './FeedIcon.vue'
import NewsIcon from './NewsIcon.vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowRightIcon, LinkIcon, EnvelopeIcon, WindowIcon, DeviceTabletIcon } from '@heroicons/vue/24/solid'
import { useStorage } from '@vueuse/core'

const open = useStorage('showWelcome', true)
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="inset-0 sm:flex min-h-full items-end justify-center text-center sm:items-center">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden sm:rounded-lg bg-white dark:bg-slate-900 text-left shadow-2xl transition-all p-8 min-w-full min-h-screen sm:min-w-0 sm:min-h-0 sm:w-full sm:max-w-lg md:max-w-xl sm:m-8 sm:p-12">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-500">
                  <NewsIcon class="h-6 w-6 text-sky-100" aria-hidden="true" />
                </div>
                <div>
                  <DialogTitle as="h1" class="text-center my-3 sm:my-5">
                    <div class="text-slate-400 uppercase tracking-widest text-2xl">Welcome to</div>
                    <div class="text-sky-500 font-bold text-3xl md:text-4xl">Readable News</div>
                  </DialogTitle>

                  <DialogDescription class="my-10 text-left sm:text-center">
                    <ol class="text-sm text-slate-500 dark:text-slate-400 flex-1 flex flex-col sm:flex-row place-content-center">
                      <li class="flex-1 flex sm:flex-col gap-6 place-items-center">
                        <div class="h-20 w-18 flex gap-2 place-items-center">
                          <img src="https://news.ycombinator.com/y18.svg" class="w-12 h-12 rounded saturate-0 opacity-50" />
                          <div class="flex flex-col">
                            <LinkIcon class="w-3 h-3 text-slate-400 dark:text-slate-600" />
                            <LinkIcon class="w-3 h-3 text-slate-400 dark:text-slate-600" />
                            <LinkIcon class="w-3 h-3 text-slate-400 dark:text-slate-600" />
                          </div>
                        </div>
                        <div class="intro-description">Social News</div>
                      </li>
                      <li class="arrow-container">
                        <ArrowRightIcon class="arrow"/>
                      </li>
                      <li class="flex-1 flex sm:flex-col gap-6 place-items-center">
                        <div class="h-20 w-18 relative">
                          <div class="w-16 h-18 border rounded bg-white dark:bg-slate-900 dark:border-slate-800 shadow p-1 sm:mx-auto">
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-5 mb-[3px] mx-auto" style="width: 100%;"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:95%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:90%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:97%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:55%"></div>

                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[3.5px] mb-[3px] mt-[6px]" style="width:50%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:94%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:100%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:96%"></div>
                            <div class="bg-slate-200 dark:bg-slate-700 rounded-sm h-[2px] mb-[2px]" style="width:60%"></div>
                          </div>
                        </div>
                        <div class="intro-description">Made Readable</div>
                      </li>
                      <li class="arrow-container">
                        <ArrowRightIcon class="arrow"/>
                      </li>
                      <li class="flex-1 flex sm:flex-col gap-6 place-items-center">
                        <div class="h-20 w-18 grid grid-cols-2 mx-auto place-items-center place-content-center text-slate-300 dark:text-slate-600">
                          <WindowIcon class="w-9 h-9 " />
                          <DeviceTabletIcon class="w-7 h-7" />
                          <FeedIcon class="w-6 h-6" />
                          <EnvelopeIcon class="w-8 h-8" />
                        </div>
                        <div class="intro-description">For You</div>
                      </li>
                    </ol>
                  </DialogDescription>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button"
                  class="block w-2/3 mx-auto justify-center rounded-md bg-sky-500 p-3 my-4 text-sm font-semibold text-white shadow-sm hover:shadow hover:bg-sky-400 focus:outline-sky-300"
                  @click="open = false">Start Reading</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.arrow-container {
  @apply flex-none w-6 h-0 overflow-visible sm:h-20 flex place-content-center;
}

.arrow {
  @apply absolute h-8 -translate-y-1/2 sm:static sm:translate-y-0 sm:translate-x-0 left-32 sm:h-auto sm:w-full text-slate-300 dark:text-slate-600 rotate-90 sm:rotate-0;
}

.intro-description {
  @apply sm:-mx-2 text-lg font-medium grow;
}
</style>
